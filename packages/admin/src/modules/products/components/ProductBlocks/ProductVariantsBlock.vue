<script lang="ts" setup>
    import {
        ref,
        unref,
        watch,
    } from 'vue'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductVariants } from '@modules/products/composables/use-product-variants'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { ItemsList } from '@shared/components/ItemsList'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import type {
        IFilterGroup,
        IFilterItem,
        IOption,
        IProduct,
    } from '@proshop/types'

    const { model } = useProductModel()
    const { products, getProducts } = useProductsService()

    const {
        variantItems,
        isEditMode,
        mergedVariants,
        optionModel,
        optionProductLink,
        currentVariant,
        setCurrentVariant,
        clearVariantOptionForm,
        onUpdateVariantOption,
        onCreateVariantOption,
        onDeleteVariantOption,
    } = useProductVariants()

    const { filterItems, getFilterItems } = useFilterItemsService()
    const { filterGroups, getFilterGroupItems } = useFilterGroupService()

    const filterGroup = ref<Maybe<IFilterGroup>>(null)

    const createOption = async (validate: () => Promise<boolean>) => {
        await validate()

        unref(optionModel)!.variantId = unref(currentVariant)!.id
        unref(optionModel)!.ownerId = unref(model)!.id

        if (unref(isEditMode)) {
            await onUpdateVariantOption(unref(optionModel))
        } else {
            await onCreateVariantOption(unref(optionModel))
        }

        optionProductLink.value = null
    }

    const onDeleteOption = (option: IOption) => {
        unref(currentVariant)!.options = (unref(currentVariant)!.options as IOption[]).filter(it => it.id !== option.id)
        onDeleteVariantOption({ variant: unref(currentVariant), option })
    }

    const setOptionForEditing = (option: IOption) => {
        isEditMode.value = true
        optionModel.value = option
        optionModel.value.url = (option.product as IProduct)?.url
        optionModel.value.variantId = option.variantId
    }

    const onSelectFilterItem = (item: IFilterItem) => {
        unref(optionModel).name = item.value as string
    }

    const onSelectOptionLinkedProduct = (product: IProduct) => {
        unref(optionModel).variantId = unref(currentVariant)!.id
        unref(optionModel).product = product
    }

    watch(variantItems, (variants) => {
        if (!variants) return

        if (unref(mergedVariants)[0]) {
            setCurrentVariant(unref(mergedVariants)[0])
        }

    }, { immediate: true })

    /**
     * @description Наблюдаем в режиме редактирования за вариантами продукта
     * и перезаписываем мапу существующих вариантов для редактирования
     */
    watch(() => unref(model)?.variants, (variants) => {
        if (!variants || !variants.length) return

        if (unref(currentVariant)) {
            const variant = variants.find(it => it.id === unref(currentVariant)!.id)

            setCurrentVariant(variant || unref(mergedVariants)[0])
        } else {
            setCurrentVariant(unref(currentVariant) || variants[0])
        }

    }, { immediate: true })

    watch(currentVariant, () => {
        filterGroup.value = null
    }, { immediate: true })

</script>
<template>
    <v-row
        v-if="variantItems"
        class="app-border-radius"
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
                                :items="mergedVariants"
                                value-key="group"
                                color="primary"
                                @select="setCurrentVariant"
                            />
                        </v-col>
                        <v-col>
                            <v-select
                                v-model="filterGroup"
                                label="Группа фильтров"
                                value-key="name"
                                color="primary"
                                :disabled="!currentVariant"
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
                        <v-col
                            v-if="optionModel.image"
                            cols="2"
                            style="height: 130px; position: relative"
                            class="d-flex align-center justify-center elevation-2"
                        >
                            <img
                                :src="optionModel.image"
                                style="width: 100px;"
                            >
                        </v-col>
                    </v-row>
                </template>
            </form-card>
        </v-col>
        <v-col
            cols="6"
            class="mb-4"
        >
            <v-form v-slot="{validate}">
                <form-card>
                    <template #icon>
                        <v-svg :path="SvgPaths.DIAGRAM_NESTED"/>
                    </template>
                    <template #title>
                        Параметры опции товара
                    </template>
                    <template #body>
                        <v-text-field
                            v-if="!filterGroup"
                            v-model.trim="optionModel.name"
                            color="primary"
                            label="Значение *"
                            :rules="[val => !!val || 'Обязательное поле']"
                            :disabled="!!optionProductLink"
                        />
                        <v-select
                            v-else
                            v-model="optionModel.name"
                            label="Фильтр *"
                            :items="filterItems"
                            color="primary"
                            value-key="value"
                            :rules="[val => !!val || 'Обязательное поле']"
                            @focus="getFilterItems({groupId: filterGroup.id})"
                            @select="onSelectFilterItem"
                        />
                        <v-autocomplete
                            v-if="!optionModel.url"
                            :key="optionProductLink"
                            v-model="optionProductLink"
                            label="Ссылка на товар"
                            :items="products"
                            value-key="name"
                            prepend-icon="fas fa-search"
                            color="primary"
                            typeable
                            clearable
                            @input="getProducts({name: $event})"
                            @select="onSelectOptionLinkedProduct"
                        />
                        <v-text-field
                            v-else
                            v-model="optionModel.url"
                            readonly
                            label="Ссылка на товар"
                        >
                            <template #append-icon>
                                <v-icon
                                    clickable
                                    @click="optionModel.url = ''"
                                >
                                    fas fa-times
                                </v-icon>
                            </template>
                        </v-text-field>
                        <v-text-field
                            v-model.number="optionModel.quantity"
                            color="primary"
                            label="Количество"
                            type="number"
                            :disabled="!!optionProductLink"
                        />
                        <v-text-field
                            v-model.number="optionModel.price"
                            color="primary"
                            label="Цена"
                            type="number"
                            :disabled="!!optionProductLink"
                        />
                        <v-text-field
                            v-model.number="optionModel.order"
                            color="primary"
                            label="Порядковый номер"
                            type="number"
                        />
                        <v-text-field
                            v-model.trim="optionModel.description"
                            label="Описание"
                            color="primary"
                            :disabled="!!optionProductLink"
                        />
                    </template>
                    <template #actions>
                        <v-button
                            color="success"
                            class="app-border-radius"
                            elevation="2"
                            width="120"
                            @click="createOption(validate)"
                        >
                            {{ optionModel.id ? 'изменить' : 'сохранить' }}
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
        <v-col
            cols="6"
            class="mb-4"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.NEWSPAPER"/>
                </template>
                <template #title>
                    Все опции текущего варианта
                </template>
                <template
                    v-if="currentVariant && currentVariant.options"
                    #body
                >
                    <items-list
                        v-model="optionModel"
                        :items="currentVariant.options"
                        @delete="onDeleteOption"
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
