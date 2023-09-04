<script lang="ts" setup>
    import {
        computed,
        ref,
        unref,
        watch
    } from 'vue'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { useProduct } from '@modules/products/composables/use-product'
    import { IFilterGroup } from '@proshop/types'
    import { useProductAttributes } from '@modules/products/composables/use-product-attributes'

    const { model } = useProduct()

    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { filterItems, getFilterItems } = useFilterItemsService()
    const { currentEditableAttribute, attributeItems } = useProductAttributes()

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

    const clearEditableAttribute = () => {
        currentEditableAttribute.value = null
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
    <v-row
        class="elevation-1 white mb-2 pl-4"
        style="position: sticky; top: 0; z-index: 1"
    >
        <v-col cols="3">
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
        </v-col>
        <v-col
            cols="6"
            class="d-flex"
        >
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
        </v-col>
        <v-spacer/>
        <v-col
            cols="1"
            class="d-flex justify-center align-center"
        >
            <v-icon
                clickable
                size="24"
                @click="clearEditableAttribute"
            >
                fas fa-times
            </v-icon>
        </v-col>
    </v-row>
</template>
