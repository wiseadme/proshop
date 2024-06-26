<script lang="ts" setup>
    import {
        onMounted,
        ref,
        unref,
        watch
    } from 'vue'

    import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
    import { useOptionModel } from '@modules/groups/composables/view/use-option-model'
    import { useOptions } from '@modules/groups/composables/view/use-options'

    import { ModalCard } from '@shared/components/Modals'
    import { VSvg } from '@shared/components/VSvg'

    import OptionsFormOptionsList from '@modules/groups/components/OptionsForm/OptionsFormOptionsList.vue'

    import type {
        IFilterGroup,
        IFilterItem,
        IOption,
        IProduct
    } from '@proshop/types'

    import { SvgPaths } from '@shared/enums/svg-paths'


    defineEmits<{
        (e: 'close'): void
        (e: 'create-option', value: IOption): void
    }>()

    const { model: groupModel } = useGroupModel()
    const { model: optionModel } = useOptionModel()

    const {
        options,
        filterItems,
        filterGroups,
        products,
        optionProduct,
        getOptionFilterGroups,
        getOptionFilterGroupItems,
        saveOption,
        onSearchProducts
    } = useOptions()

    const selectedFilterGroup = ref<Maybe<IFilterGroup>>(null)

    const onOptionValueSelect = (filter: IFilterItem) => {
        unref(optionModel).value = filter.value as string
    }

    const onSelectProduct = (product: IProduct) => {
        optionProduct.value = product

        unref(optionModel).url = product.url
        unref(optionModel).image = product.image ?? ''
        unref(optionModel).isAvailable = Boolean(product.quantity)
        unref(optionModel).productName = product.name
        unref(optionModel).groupId = unref(groupModel).id
    }

    const onCreateOption = (validate: () => Promise<boolean>) => {
        validate().then(() => saveOption(unref(optionModel)))
    }

    onMounted(() => {
        getOptionFilterGroups()
    })

    watch(() => unref(groupModel).variant?.id, (value) => {
        if (!unref(filterGroups).length) {
            getOptionFilterGroups({ attributeId: value.attributeId })
        }
    })

    watch(selectedFilterGroup, (value) => {
        value && getOptionFilterGroupItems({ groupId: unref(selectedFilterGroup)!.id })
    })

</script>
<template>
    <v-form v-slot="{validate}">
        <modal-card
            :width="800"
            @close="$emit('close')"
        >
            <template #icon>
                <v-svg :path="SvgPaths.LIST"/>
            </template>
            <template #title>
                {{ groupModel.name }}
            </template>
            <template #content>
                <div class="options-form">
                    <div class="options-form__filter-groups">
                        <v-row>
                            <v-col>
                                <v-select
                                    v-model="selectedFilterGroup"
                                    label="Группа фильтров *"
                                    :items="filterGroups"
                                    value-key="name"
                                    :rules="[() => selectedFilterGroup || 'Выберите группу фильтров']"
                                />
                            </v-col>
                        </v-row>
                    </div>
                    <div
                        v-if="selectedFilterGroup"
                        class="options-form_option-builder"
                    >
                        <v-row>
                            <v-col cols="4">
                                <v-select
                                    :model-value="optionModel"
                                    label="Опция"
                                    :items="filterItems"
                                    value-key="value"
                                    @select="onOptionValueSelect"
                                />
                            </v-col>
                            <v-col cols="8">
                                <v-autocomplete
                                    label="Поиск товара"
                                    typeable
                                    :items="products"
                                    value-key="name"
                                    :rules="[() => !!optionModel.url || 'Выберите товар опции']"
                                    @input="onSearchProducts"
                                    @select="onSelectProduct"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="10">
                                <v-text-field
                                    v-model="optionModel.description"
                                    label="Описание"
                                />
                            </v-col>
                            <v-col
                                cols="2"
                                class="d-flex align-center justify-center"
                            >
                                <v-button
                                    label="Добавить"
                                    style="width: 100%"
                                    elevation="2"
                                    color="success"
                                    class="app-border-radius"
                                    @click="onCreateOption(validate)"
                                />
                            </v-col>
                        </v-row>
                    </div>
                    <div class="options-form__options-list">
                        <options-form-options-list
                            :options="options"
                            :group="groupModel"
                        />
                    </div>
                </div>
            </template>
        </modal-card>
    </v-form>
</template>
