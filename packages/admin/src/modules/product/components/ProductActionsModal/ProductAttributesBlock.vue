<script lang="ts" setup>
    import {
        ref,
        unref,
        watch,
    } from 'vue'
    import draggable from 'vuedraggable'
    import { useProductAttributes } from '@modules/product/composables/use-product-attributes'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useFilterGroupService } from '@modules/filter/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filter/composables/use-filter-items-service'
    import { IFilterGroup } from '@proshop/types'

    const { model } = useProduct()
    const groupSymbol = Symbol.for('group')

    const {
        availableAttributes,
        onUpdateAttributes,
    } = useProductAttributes()

    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { filterItems, getFilterItems } = useFilterItemsService()

    const attributesMap = ref({})

    const pullFunction = () => {
    }

    const onFocusGroupSelect = () => {
        if (unref(filterGroups).length) return

        getFilterGroupItems()
    }

    const onFocusFilter = (key) => {
        const group = unref(attributesMap)[key].group as IFilterGroup
        getFilterItems({ groupId: group.id })
    }

    const onBlurFilter = (key) => {
        if (!unref(attributesMap)[key].item) return

        const attribute = unref(model).attributes.find(attr => attr.key === key)

        attribute!.value = unref(attributesMap)[key].item.value
    }

    const toggleAttribute = (attribute) => {
        const { isFilter } = unref(attributesMap)[attribute.key]
        unref(attributesMap)[attribute.key].isFilter = !isFilter
    }

    watch(availableAttributes, (attrs) => {
        attrs.reduce((map, it) => {
            map[it.key] = {
                isFilter: false,
                group: null,
                item: null,
            }

            return map
        }, attributesMap.value)
    }, { immediate: true })
</script>
<template>
    <v-row class="pa-4 elevation-2 app-border-radius">
        <v-col class="block-head pb-6 mb-8">
            <h2 class="block-head__title">
                Атрибуты
            </h2>
        </v-col>
        <v-col cols="6">
            <div class="used-attributes">
                <h3 class="grey--text text--lighten-1">
                    Текущие атрибуты
                </h3>
                <draggable
                    :list="model.attributes"
                    item-key="key"
                    :group="groupSymbol"
                    class="draggable-container"
                >
                    <template #item="{element}">
                        <v-row
                            class="my-2 pa-2 attribute app-border-radius"
                        >
                            <v-col
                                cols="1"
                                class="d-flex justify-center align-center"
                            >
                                <v-icon
                                    class="mr-3"
                                    color="primary"
                                >
                                    fas fa-grip-vertical
                                </v-icon>
                                <v-tooltip
                                    :key="attributesMap[element.key].isFilter"
                                    color="secondary"
                                    offset-y="-12"
                                    min-width="120"
                                    elevation="2"
                                    top
                                >
                                    <template #activator="{on}">
                                        <v-button
                                            :elevation="attributesMap[element.key].isFilter ? 0 : 2"
                                            color="var(--primary)"
                                            :outlined="attributesMap[element.key].isFilter"
                                            @click="toggleAttribute(element)"
                                            v-on="on"
                                        >
                                            <v-icon>
                                                fas fa-sitemap
                                            </v-icon>
                                        </v-button>
                                    </template>
                                    <span v-if="!attributesMap[element.key].isFilter">Переключить на фильтры</span>
                                    <span v-else>Вернуться к свободному вводу</span>
                                </v-tooltip>
                            </v-col>
                            <v-col
                                v-if="!attributesMap[element.key].isFilter"
                                cols="11"
                                class="d-flex"
                            >
                                <v-text-field
                                    v-model="element.value"
                                    :label="element.key"
                                    @input="onUpdateAttributes"
                                />
                            </v-col>
                            <template v-else>
                                <v-col cols="4">
                                    <v-select
                                        v-model="attributesMap[element.key].group"
                                        label="Группа фильтров"
                                        :items="filterGroups.filter(group => group.attribute === element.key)"
                                        value-key="name"
                                        @focus="onFocusGroupSelect"
                                    />
                                </v-col>
                                <v-col cols="7">
                                    <v-select
                                        v-model="attributesMap[element.key].item"
                                        :items="filterItems"
                                        label="Фильтры"
                                        value-key="value"
                                        :disabled="!attributesMap[element.key].group"
                                        @focus="onFocusFilter(element.key)"
                                        @blur="onBlurFilter(element.key)"
                                        @select="onBlurFilter(element.key)"
                                    />
                                </v-col>
                            </template>
                        </v-row>
                    </template>
                </draggable>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="attributes-list">
                <h3 class="grey--text text--lighten-1">
                    Список атрибутов
                </h3>
                <draggable
                    :list="availableAttributes"
                    item-key="key"
                    :group="{ name: groupSymbol, pull: pullFunction }"
                    class="draggable-container"
                >
                    <template #item="{element}">
                        <v-row class="my-2 pa-2 attribute app-border-radius">
                            <v-col class="d-flex">
                                <v-icon
                                    class="mr-3"
                                    color="grey lighten-2"
                                >
                                    fas fa-grip-vertical
                                </v-icon>
                                <v-text-field
                                    v-model="element.value"
                                    :label="element.key"
                                    @input="onUpdateAttributes"
                                />
                            </v-col>
                        </v-row>
                    </template>
                </draggable>
            </div>
        </v-col>
    </v-row>
</template>
<style lang="scss" scoped>
    .draggable-container {
        min-height: 400px;
        border-radius: 10px;
        overflow: hidden !important;
    }

    .attribute {
        cursor: pointer;
        border: 1px dotted #dcdcdc !important;
    }

    .sortable-ghost {
        opacity: .3;
    }
</style>
