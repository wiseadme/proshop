<script lang="ts" setup>
    import {
        onBeforeMount,
        ref,
        unref,
        watch,
    } from 'vue'
    import {
        IFilterGroup,
        IFilterItem,
        IOption,
        IProduct,
        IVariant,
    } from '@proshop/types'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useProductVariants } from '@modules/product/composables/use-product-variants'
    import { useFilterGroupService } from '@modules/filter/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filter/composables/use-filter-items-service'
    import { useProductsService } from '@modules/product/composables/use-products-service'

    const { model, isEditMode, products } = useProduct()

    const {
        variantItems,
        isVariantEditMode,
        genVariantOptionPattern,
        onSelectParentProduct,
        onUploadProductVariantOptionImage,
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
    const parentProduct = ref(null)
    const optionProductLink = ref(null)

    const setExistsVariants = (variants) => {
        const variantsMap = {}

        unref(existsVariants).forEach((it) => variantsMap[it.group] = it)
        variants?.forEach(v => variantsMap[v.group] = v)

        existsVariants.value = Object.values(variantsMap)
    }

    const createOption = async (validate) => {
        await validate()

        unref(optionPattern)!.variantId = unref(currentVariant)!.id

        if (unref(isVariantEditMode)) {
            await onUpdateProductVariantOption(unref(optionPattern))
        } else {
            await onCreateProductVariantOption(unref(optionPattern))
        }

        optionProductLink.value = null
    }

    const setCurrentVariant = (variant) => {
        optionPattern.value = genVariantOptionPattern()
        currentVariant.value = variant
        currentOption.value = null
        isVariantEditMode.value = false
    }

    const setOptionForEditing = (option) => {
        isVariantEditMode.value = true
        optionPattern.value = option
    }

    const onUploadVariantOptionImage = ({
        files,
        option,
    }: {
        files: File[]
        option: IOption
    }) => {
        onUploadProductVariantOptionImage({ file: files[0], option })
    }

    const onDeleteVariantImage = (asset) => {
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
        if (!variants) return

        setExistsVariants(variants)

        if (!unref(currentVariant)) {
            setCurrentVariant(unref(existsVariants)[0])
        }

    }, { immediate: true })

    watch(parentProduct, (to: IProduct) => {
        unref(model).variants = to.variants
    })

    /**
     * @description Наблюдаем в режиме редактирования за вариантами продукта
     * и перезаписываем мапу существующих вариантов для редактирования
     */
    watch(() => unref(model).variants, (variants) => {
        setExistsVariants(variants.length ? variants : unref(variantItems))

        const variant = variants?.find(v => v.id === unref(currentVariant)!.id)

        setCurrentVariant(variant || unref(currentVariant))

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
            cols="12"
        >
            <v-row no-gutter>
                <v-col
                    cols="4"
                    class="pr-2"
                >
                    <v-select
                        v-model="currentVariant"
                        label="Варианты"
                        :items="existsVariants"
                        value-key="group"
                        @select="setCurrentVariant"
                    />
                </v-col>
                <v-col
                    cols="4"
                    class="pl-2 pr-2"
                >
                    <v-autocomplete
                        v-model="parentProduct"
                        label="Унаследовать варианты от"
                        :items="products"
                        value-key="name"
                        typeable
                        @input="getProducts({name: $event})"
                        @select="onSelectParentProduct"
                    />
                </v-col>
                <v-col
                    cols="4"
                    class="pl-2"
                >
                    <v-select
                        v-model="filterGroup"
                        label="Группа фильтров"
                        value-key="name"
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
        </v-col>
        <v-col
            v-if="currentVariant && currentVariant.options"
            class="pa-2"
            cols="12"
        >
            <v-chip
                v-for="option in currentVariant.options"
                :key="option.id"
                :color="!option.id ? 'grey': option === optionPattern ? 'primary' : 'secondary'"
                :class="['mr-2']"
                closable
                @click="setOptionForEditing(option)"
                @close="onDeleteProductVariantOption({variant: currentVariant, option})"
            >
                {{ option.name }}
            </v-chip>
        </v-col>
        <v-col
            style="border-radius: 5px;"
            class="py-4 mt-2"
        >
            <v-form v-slot="{validate}">
                <v-row no-gutter>
                    <v-col
                        cols="6"
                        class="pr-2"
                    >
                        <v-text-field
                            v-if="!filterGroup"
                            v-model.trim="optionPattern.name"
                            color="#272727"
                            label="Значение *"
                            :rules="[val => !!val || 'Обязательное поле']"
                            :disabled="!isEditMode"
                        />
                        <v-select
                            v-else
                            v-model="optionPattern.name"
                            label="Фильтр *"
                            :items="filterItems"
                            value-key="value"
                            :rules="[val => !!val || 'Обязательное поле']"
                            @focus="getFilterItems({groupId: filterGroup.id})"
                            @select="onSelectFilterItem"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="pl-2"
                    >
                        <v-text-field
                            v-model.number="optionPattern.quantity"
                            color="#272727"
                            label="Количество"
                            type="number"
                            :disabled="!isEditMode"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="pr-2"
                    >
                        <v-text-field
                            v-model.number="optionPattern.price"
                            color="#272727"
                            label="Цена"
                            type="number"
                            :disabled="!isEditMode"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="pl-2"
                    >
                        <v-text-field
                            v-model.trim="optionPattern.description"
                            color="#272727"
                            :disabled="!isEditMode"
                            label="Описание"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="pr-2"
                    >
                        <v-autocomplete
                            v-model="optionProductLink"
                            label="Ссылка на товар"
                            :items="products"
                            value-key="name"
                            typeable
                            @input="getProducts({name: $event})"
                            @select="onSelectOptionLinkedProduct"
                        />
                    </v-col>
                    <v-col
                        cols="6"
                        class="pl-2"
                    >
                        <v-file-input
                            v-model="optionPattern.assets"
                            :label="!optionPattern.id ? 'только после сохранения варианта *': 'загрузить изображения'"
                            color="#272727"
                            :disabled="!optionPattern.id"
                            @update:value="onUploadVariantOptionImage({files: $event, option: optionPattern})"
                        />
                    </v-col>
                </v-row>
                <v-row class="pt-2">
                    <div
                        class="variant-images pa-2"
                        style="width: 100%; min-height: 200px; border: 1px dotted #272727; border-radius: 5px;"
                    >
                        <v-row>
                            <v-col
                                v-if="!optionPattern.assets.length"
                                cols="4"
                                offset="4"
                                class="d-flex justify-center align-center"
                                style="height: 130px"
                            >
                                <div
                                    class="grey--text text--lighten-2"
                                >
                                    тут должны быть изображения варианта
                                </div>
                            </v-col>
                            <template v-else>
                                <v-row>
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
                        </v-row>
                    </div>
                </v-row>
                <v-row class="mt-4 ml-2">
                    <v-button
                        color="primary"
                        class="app-border-radius"
                        elevation="2"
                        width="120"
                        :disabled="!isEditMode"
                        @click="createOption(validate)"
                    >
                        {{ optionPattern.id ? 'изменить' : 'сохранить' }}
                    </v-button>
                    <v-button
                        class="ml-2 app-border-radius"
                        color="warning"
                        width="120"
                        elevation="2"
                        :disabled="!isEditMode"
                        @click="clearVariantOptionForm"
                    >
                        очистить
                    </v-button>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>
