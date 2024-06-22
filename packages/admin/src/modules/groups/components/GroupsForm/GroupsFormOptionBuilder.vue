<script lang="ts" setup>
    import { unref } from 'vue'
    import { useGroups } from '@modules/groups/composables/view/use-groups'
    import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
    import { useOptionModel } from '@modules/groups/composables/view/use-option-model'
    import type {
        IFilterItem,
        IGroupOption,
        IProduct
    } from '@proshop/types'

    defineProps<{
        filters: IFilterItem[]
    }>()

    const emit = defineEmits<{
        (e: 'create-option', value: IGroupOption)
    }>()

    const {
        model: groupModel,
    } = useGroupModel()

    const {optionModel} = useOptionModel()

    const {
        products,
        onSearchProducts
    } = useGroups()

    const onOptionValueSelect = (filter: IFilterItem) => {
        unref(optionModel).value = filter.value as string
    }

    const onSelect = ({ url, image, name, quantity }: IProduct) => {
        unref(optionModel).url = url
        unref(optionModel).image = image ?? ''
        unref(optionModel).isAvailable = Boolean(quantity)
        unref(optionModel).productName = name
        unref(optionModel).groupId = unref(groupModel).id
    }

    const onCreateOption = (validate: () => Promise<boolean>) => {
        validate().then(() => emit('create-option', unref(optionModel)))
    }
</script>
<template>
    <div class="groups-option-builder">
        <v-form v-slot="{validate}">
            <v-row>
                <v-col cols="4">
                    <v-select
                        :model-value="optionModel"
                        label="Опция"
                        :items="filters"
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
                        @select="onSelect"
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
        </v-form>
    </div>
</template>
