<script lang="ts" setup>
    import {
        computed,
        ref,
        unref,
        watch,
    } from 'vue'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductAttributes } from '@modules/products/composables/use-product-attributes'
    import { ModalCard } from '@shared/components/Modals'
    import { IFilterGroup } from '@proshop/types'

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
        currentEditableAttribute,
        attributeItems,
        isAttributeEditMode,
        onUpdateAttributes,
        onDiscardChanges,
    } = useProductAttributes()

    const attributesMap = ref({})

    const attrFilterGroups = computed(() => unref(filterGroups).filter(group => group.attributeId === unref(currentEditableAttribute)?.id))

    const onFocusGroupSelect = () => {
        if (unref(filterGroups).length) return

        getFilterGroupItems()
    }

    const onFocusFilter = (attrId: string) => {
        const group = unref(attributesMap)[attrId].group as IFilterGroup
        getFilterItems({ groupId: group.id })
    }

    const onBlurFilter = (attrId: string) => {
        if (!unref(attributesMap)[attrId].item) {
            return
        }

        const attribute = unref(model).attributes.find(attr => attr.id === attrId)
        attribute!.value = unref(attributesMap)[attrId].item.value
    }

    watch(attributeItems, (attrs) => {
        attrs?.reduce((map, it) => {
            map[it.id] = {
                isFilter: false,
                group: { name: 'Нет' },
                item: null,
            }

            return map
        }, attributesMap.value)

    }, { immediate: true })
</script>
<template>
    <v-modal
        v-model="isAttributeEditMode"
        transition="scale-in"
        width="600"
        overlay
    >
        <modal-card
            v-if="currentEditableAttribute"
            class="app-border-radius"
            elevation="2"
            width="600px"
        >
            <template #title>
                <h5>Редатикрование атрибута {{ currentEditableAttribute.key }}</h5>
            </template>
            <template #header>
                <v-button
                    round
                    color="grey lighten-1"
                    elevation="2"
                    @click="onDiscardChanges"
                >
                    <v-icon>fas fa-times</v-icon>
                </v-button>
            </template>
            <template #content>
                <v-select
                    v-model="attributesMap[currentEditableAttribute.id].group"
                    label="Группа фильтров"
                    value-key="name"
                    color="primary"
                    @focus="onFocusGroupSelect"
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
                    v-if="!attributesMap[currentEditableAttribute.id].group?.id"
                    v-model="currentEditableAttribute.value"
                    :label="currentEditableAttribute.key"
                    color="primary"
                />
                <v-select
                    v-else
                    v-model="attributesMap[currentEditableAttribute.id].item"
                    :items="filterItems"
                    :label="`Фильтры для -> ${currentEditableAttribute.key}`"
                    value-key="value"
                    color="primary"
                    :disabled="!attributesMap[currentEditableAttribute.id].group"
                    @focus="onFocusFilter(currentEditableAttribute.id)"
                    @blur="onBlurFilter(currentEditableAttribute.id)"
                    @select="onBlurFilter(currentEditableAttribute.id)"
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
