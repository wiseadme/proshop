<script lang="ts" setup>
    import { unref } from 'vue'
    import { useGroups } from '@modules/groups/composables/use-groups'
    import { useGroupModel } from '@modules/groups/composables/use-group-model'
    import type {
        IFilterItem,
        IGroupOption,
        IProduct
    } from '@proshop/types'

    const emit = defineEmits<{
        (e: 'create-option', value: IGroupOption)
    }>()

    defineProps<{
        filters: IFilterItem[]
    }>()

    const {
        optionModel: groupOptionModel,
    } = useGroupModel()

    const {
        products,
        onSearchProducts
    } = useGroups()

    const onOptionValueSelect = (filter: IFilterItem) => {
        unref(groupOptionModel).value = filter.value as string
    }

    const onSelect = ({ url, image, name, quantity }: IProduct) => {
        unref(groupOptionModel).url = url
        unref(groupOptionModel).image = image ?? ''
        unref(groupOptionModel).isAvailable = Boolean(quantity)
        unref(groupOptionModel).productName = name
    }

    const onCreateOption = (validate: () => Promise<boolean>) => {
        validate().then(() => emit('create-option', unref(groupOptionModel)))
    }
</script>
<template>
    <div class="groups-option-builder">
        <v-form v-slot="{validate}">
            <v-row>
                <v-col cols="4">
                    <v-select
                        :model-value="groupOptionModel"
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
                        :rules="[() => !!groupOptionModel.url || 'Выберите товар опции']"
                        @input="onSearchProducts"
                        @select="onSelect"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <v-text-field
                        v-model="groupOptionModel.description"
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
