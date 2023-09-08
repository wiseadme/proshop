<script lang="ts" setup>
    import {
        onBeforeMount,
        ref,
        unref,
        watch,
    } from 'vue'
    import { useProduct } from '@modules/products/composables/use-product'
    import { useProductVariants } from '@modules/products/composables/use-product-variants'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { ItemsList } from '@shared/components/ItemsList'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import {
        IAsset,
        IFilterGroup,
        IFilterItem,
        IOption,
        IProduct,
        IVariant,
    } from '@proshop/types'

    const { model, products } = useProduct()

    const {
        variantItems,
        isVariantEditMode,
        genVariantOptionPattern,
        onSelectParentProduct,
        // onUploadProductVariantOptionImage,
        onDeleteProductVariantOptionImage,
        onUpdateProductVariantOption,
        onCreateProductVariantOption,
        onDeleteProductVariantOption,
    } = useProductVariants()

    const { getProducts } = useProductsService()

    const { filterItems, getFilterItems } = useFilterItemsService()
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()

    const currentVariant = ref<Maybe<IVariant>>(null)
    const currentOption = ref<Maybe<IOption>>(null)
    const filterGroup = ref<Maybe<IFilterGroup>>(null)
    const existsVariants = ref<IVariant[]>([])
    const optionPattern = ref<IOption>(genVariantOptionPattern())
    const productForInherit = ref(null)
    const optionProductLink = ref(null)

    const setExistsVariants = (variants: IVariant[]) => {
        const variantsMap = {}

        unref(existsVariants).forEach((it) => variantsMap[it.group] = it)
        variants?.forEach(v => variantsMap[v.group] = v)

        existsVariants.value = Object.values(variantsMap)
    }

    const createOption = async (validate: () => Promise<boolean>) => {
        await validate()

        unref(optionPattern)!.variantId = unref(currentVariant)!.id

        if (unref(isVariantEditMode)) {
            await onUpdateProductVariantOption(unref(optionPattern))
        } else {
            await onCreateProductVariantOption(unref(optionPattern))
        }

        optionProductLink.value = null
        productForInherit.value = null
    }

    const setCurrentVariant = (variant: IVariant) => {
        optionPattern.value = genVariantOptionPattern()
        currentVariant.value = variant
        currentOption.value = null
        isVariantEditMode.value = false
    }

    const setOptionForEditing = (option: IOption) => {
        isVariantEditMode.value = true
        optionPattern.value = option
    }

    // const onUploadVariantOptionImage = ({
    //     files,
    //     option,
    // }: {
    //     files: File[]
    //     option: IOption
    // }) => {
    //     onUploadProductVariantOptionImage({ file: files[0], option })
    // }

    const onDeleteVariantImage = (asset: IAsset) => {
        const option = unref(optionPattern)

        onDeleteProductVariantOptionImage({ asset, option })
    }

    const clearVariantOptionForm = () => {
        isVariantEditMode.value = false

        optionPattern.value = genVariantOptionPattern()
    }

    const onSelectFilterItem = (item: IFilterItem) => {
        unref(optionPattern).name = item.value as string
    }

    const onSelectOptionLinkedProduct = (product: IProduct) => {
        unref(optionPattern).url = product.url
        unref(optionPattern).price = product.price
        unref(optionPattern).assets = product.assets
        unref(optionPattern).quantity = product.quantity
    }

    watch(variantItems, (variants) => {
        if (!variants) {
            return
        }

        setExistsVariants(variants)

        if (!unref(currentVariant)) {
            setCurrentVariant(unref(existsVariants)[0])
        }

    }, { immediate: true })

    watch(productForInherit, (product: IProduct) => {
        unref(model).variants = product?.variants || []
    })

    /**
     * @description Наблюдаем в режиме редактирования за вариантами продукта
     * и перезаписываем мапу существующих вариантов для редактирования
     */
    watch(() => unref(model).variants, (variants) => {
        setExistsVariants(variants.length ? variants! : unref(variantItems)!)

        const variant = variants?.find(v => v.id === unref(currentVariant)!.id)

        setCurrentVariant(variant! || unref(currentVariant))

    }, { immediate: true })

    onBeforeMount(() => {
        optionPattern.value = genVariantOptionPattern()
    })

</script>
<template>
    <v-row
        v-if="variantItems"
        class="elevation-2 pa-4 app-border-radius"
    >
        <v-col
            v-if="variantItems.length"
            cols="6"
            class="mb-4"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.DIAGRAM_NESTED"/>
                </template>
                <template #title>
                    Выберите группу вариантов, фильтров или скопируйте варианты похожего товара
                </template>
                <template #body>
                    <v-row no-gutter>
                        <v-col>
                            <v-select
                                v-model="currentVariant"
                                label="Варианты"
                                :items="existsVariants"
                                value-key="group"
                                color="primary"
                                @select="setCurrentVariant"
                            />
                        </v-col>
                        <v-col>
                            <v-autocomplete
                                v-model="productForInherit"
                                label="Унаследовать варианты"
                                :items="products"
                                value-key="name"
                                color="primary"
                                typeable
                                clearable
                                @input="getProducts({name: $event})"
                                @select="onSelectParentProduct"
                            />
                        </v-col>
                        <v-col>
                            <v-select
                                v-model="filterGroup"
                                label="Группа фильтров"
                                value-key="name"
                                color="primary"
                                @focus="getFilterGroupItems"
                            >
                                <template #select-list="{onSelect}">
                                    <v-list
                                        active
                                        active-class="primary white--text"
                                    >
                                        <v-list-item @click="filterGroup = null">
                                            <v-list-item-title>
                                                не выбрано
                                            </v-list-item-title>
                                        </v-list-item>
                                        <v-list-item
                                            v-for="item in filterGroups.filter((group) => group.attributeId === currentVariant.attributeId)"
                                            :key="item.id"
                                            @click="onSelect(item)"
                                        >
                                            <v-list-item-title>
                                                {{ item.name }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </template>
                            </v-select>
                        </v-col>
                    </v-row>
                </template>
            </form-card>
        </v-col>
        <v-col
            cols="6"
            class="mb-4"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.CAMERA"/>
                </template>
                <template #title>
                    Тут отобразятся фото товара опции
                </template>
                <template #body>
                    <v-row>
                        <!--                        <v-col>-->
                        <!--                            <v-file-input-->
                        <!--                                v-model="optionPattern.assets"-->
                        <!--                                :label="!optionPattern.id ? 'только после сохранения варианта *': 'загрузить изображения'"-->
                        <!--                                color="primary"-->
                        <!--                                :disabled="!optionPattern.id"-->
                        <!--                                @update:value="onUploadVariantOptionImage({files: $event, option: optionPattern})"-->
                        <!--                            />-->
                        <!--                        </v-col>-->
                        <v-col
                            v-for="asset in optionPattern.assets"
                            :key="asset.id"
                            cols="2"
                            style="height: 130px; position: relative"
                            class="d-flex align-center justify-center elevation-2"
                        >
                            <v-icon
                                style="position: absolute; top: 5px; right: 5px;"
                                icon="fas fa-times"
                                clickable
                                @click="onDeleteVariantImage(asset)"
                            />
                            <img
                                :src="asset.url"
                                style="width: 100px;"
                            >
                        </v-col>
                    </v-row>
                </template>
            </form-card>
        </v-col>
        <v-col cols="6">
            <v-form v-slot="{validate}">
                <form-card>
                    <template #icon>
                        <v-svg :path="SvgPaths.DIAGRAM_NESTED"/>
                    </template>
                    <template #body>
                        <v-text-field
                            v-if="!filterGroup"
                            v-model.trim="optionPattern.name"
                            color="primary"
                            label="Значение *"
                            :rules="[val => !!val || 'Обязательное поле']"
                            :disabled="!!optionProductLink"
                        />
                        <v-select
                            v-else
                            v-model="optionPattern.name"
                            label="Фильтр *"
                            :items="filterItems"
                            color="primary"
                            value-key="value"
                            :rules="[val => !!val || 'Обязательное поле']"
                            @focus="getFilterItems({groupId: filterGroup.id})"
                            @select="onSelectFilterItem"
                        />
                        <v-autocomplete
                            v-model="optionProductLink"
                            label="Ссылка на товар"
                            :items="products"
                            value-key="name"
                            color="primary"
                            typeable
                            clearable
                            @input="getProducts({name: $event})"
                            @select="onSelectOptionLinkedProduct"
                        />
                        <!--                        <v-text-field-->
                        <!--                            v-else-->
                        <!--                            v-model="optionPattern.url"-->
                        <!--                            readonly-->
                        <!--                            clearable-->
                        <!--                            label="Ссылка на товар"-->
                        <!--                        />-->
                        <v-text-field
                            v-model.number="optionPattern.quantity"
                            color="primary"
                            label="Количество"
                            type="number"
                            :disabled="!!optionProductLink"
                        />
                        <v-text-field
                            v-model.number="optionPattern.price"
                            color="primary"
                            label="Цена"
                            type="number"
                            :disabled="!!optionProductLink"
                        />
                        <v-text-field
                            v-model.trim="optionPattern.description"
                            color="primary"
                            :disabled="!!optionProductLink"
                            label="Описание"
                        />
                    </template>
                    <template #actions>
                        <v-button
                            color="primary"
                            class="app-border-radius"
                            elevation="2"
                            width="120"
                            @click="createOption(validate)"
                        >
                            {{ optionPattern.id ? 'изменить' : 'сохранить' }}
                        </v-button>
                        <v-button
                            class="ml-2 app-border-radius"
                            color="secondary"
                            width="120"
                            elevation="2"
                            @click="clearVariantOptionForm"
                        >
                            очистить
                        </v-button>
                    </template>
                </form-card>
            </v-form>
        </v-col>
        <v-col cols="6">
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.NEWSPAPER"/>
                </template>
                <template
                    v-if="currentVariant && currentVariant.options"
                    #body
                >
                    <items-list
                        :items="currentVariant.options"
                        @delete="onDeleteProductVariantOption({variant: currentVariant, option: $event})"
                        @edit="setOptionForEditing"
                    >
                        <template #title="{item}">
                            {{ item.name }}
                        </template>
                    </items-list>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
