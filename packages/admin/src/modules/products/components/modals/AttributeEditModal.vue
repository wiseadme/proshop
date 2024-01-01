<script lang="ts" setup>
    import {
        computed,
        ref,
        unref,
        watch,
    } from 'vue'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { useProductAttributes } from '@modules/products/composables/use-product-attributes'
    import { ModalCard } from '@shared/components/Modals'

    const { model } = useProductModel()

    const {
        filterGroups,
        getFilterGroupItems,
    } = useFilterGroupService()

    const {
        filterItems,
        getFilterItems,
    } = useFilterItemsService()

    const {
        editable,
        attributeItems,
        isEditMode,
        onUpdateAttributes,
        onDiscardChanges,
    } = useProductAttributes()

    const attributesMap = ref({})

    const attrFilterGroups = computed(() => unref(filterGroups).filter(({ attributeId }) => attributeId === unref(editable)?.id))

    const onFocusFilter = () => {
        const { id } = unref(editable)!
        const { group } = unref(attributesMap)[id]

        getFilterItems({ groupId: group.id })
    }

    const onSelectFilter = () => {
        const { attributes } = unref(model)
        const { id } = unref(editable)!
        const attr = attributes.find(attr => attr.id === id)

        attr!.value = unref(attributesMap)[id].item.value
    }

    watch(attributeItems, (attrs) => {
        attrs?.reduce((map, { id, key }) => {
            map[id] = { key }

            return map
        }, attributesMap.value)

    }, { immediate: true })
</script>
<template>
    <v-modal
        v-model="isEditMode"
        transition="scale-in"
        width="600"
        overlay
    >
        <modal-card
            v-if="editable"
            class="app-border-radius"
            elevation="2"
            :width="600"
            @close="onDiscardChanges"
        >
            <template #title>
                <h5>Редатикрование атрибута {{ editable.key }}</h5>
            </template>
            <template #content>
                <v-select
                    v-model="attributesMap[editable.id].group"
                    label="Группа фильтров"
                    value-key="name"
                    color="primary"
                    :loading="!filterGroups.length"
                    @focus="getFilterGroupItems"
                >
                    <template #select-list="{onSelect}">
                        <v-list active>
                            <v-list-item @click="onSelect({name: 'Нет'})">
                                <v-list-item-title>
                                    Нет
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                v-for="it in attrFilterGroups"
                                :key="it.id"
                                @click="onSelect(it)"
                            >
                                <v-list-item-title>
                                    {{ it.name }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-select>
                <v-text-field
                    v-if="!attributesMap[editable.id].group?.id"
                    v-model="editable.value"
                    :label="editable.key"
                    color="primary"
                />
                <v-select
                    v-else
                    v-model="attributesMap[editable.id].item"
                    :items="filterItems"
                    :label="`Фильтры для -> ${editable.key}`"
                    value-key="value"
                    color="primary"
                    :disabled="!attributesMap[editable.id].group"
                    @focus="onFocusFilter()"
                    @select="onSelectFilter()"
                />
            </template>
            <template #actions>
                <v-button
                    class="app-border-radius mr-2"
                    width="120"
                    color="success"
                    elevation="2"
                    @click="onUpdateAttributes"
                >
                    Сохранить
                </v-button>
            </template>
        </modal-card>
    </v-modal>
</template>
