<script lang="ts" setup>
    import {
        computed,
        ref,
        unref,
        watch,
    } from 'vue'
    import draggable from 'vuedraggable'
    import { useProductAttributes } from '@modules/product/composables/use-product-attributes'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useFilterGroupService } from '@modules/filter/composables/use-filter-group-service'
    import { useFilterItemsService } from '@modules/filter/composables/use-filter-items-service'
    import { IAttribute, IFilterGroup } from '@proshop/types'
    import { FormCard } from '@shared/components/FormCard'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useProduct()
    const groupSymbol = Symbol.for('group')

    const {
        usedAttributes,
        availableAttributes,
        onUpdateAttributes,
    } = useProductAttributes()

    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { filterItems, getFilterItems } = useFilterItemsService()

    const attributesMap = ref({})

    const allAttributes = computed(() => unref(availableAttributes).concat(unref(usedAttributes)))

    const pullFunction = () => {
    }

    const onFocusGroupSelect = () => {
        if (unref(filterGroups).length) return

        getFilterGroupItems()
    }

    const onFocusFilter = (attrId) => {
        const group = unref(attributesMap)[attrId].group as IFilterGroup
        getFilterItems({ groupId: group.id })
    }

    const onBlurFilter = (attrId) => {
        if (!unref(attributesMap)[attrId].item) return

        const attribute = unref(model).attributes.find(attr => attr.id === attrId)

        attribute!.value = unref(attributesMap)[attrId].item.value
    }

    const toggleAttribute = (attribute: IAttribute) => {
        const { isFilter } = unref(attributesMap)[attribute.id]
        unref(attributesMap)[attribute.id].isFilter = !isFilter
    }

    watch(allAttributes, (attrs) => {
        attrs.reduce((map, it) => {
            map[it.id] = {
                isFilter: false,
                group: null,
                item: null,
            }

            return map
        }, attributesMap.value)

    }, { immediate: true })
</script>
<template>
    <v-row class="pa-4">
        <v-col
            cols="6"
            class="used-attributes app-border-radius"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_IN"/>
                </template>
                <template #body>
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
                                        :key="attributesMap[element.id]?.isFilter"
                                        color="secondary"
                                        offset-y="-12"
                                        min-width="120"
                                        elevation="2"
                                        top
                                    >
                                        <template #activator="{on}">
                                            <v-button
                                                :elevation="attributesMap[element.id]?.isFilter ? 0 : 2"
                                                color="var(--primary)"
                                                :outlined="attributesMap[element.id]?.isFilter"
                                                @click="toggleAttribute(element)"
                                                v-on="on"
                                            >
                                                <v-icon>
                                                    fas fa-sitemap
                                                </v-icon>
                                            </v-button>
                                        </template>
                                        <span v-if="!attributesMap[element.id]?.isFilter">Переключить на фильтры</span>
                                        <span v-else>Вернуться к свободному вводу</span>
                                    </v-tooltip>
                                </v-col>
                                <v-col
                                    v-if="!attributesMap[element.id]?.isFilter"
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
                                            v-model="attributesMap[element.id].group"
                                            label="Группа фильтров"
                                            :items="filterGroups.filter(group => group.attributeId === element.id)"
                                            value-key="name"
                                            @focus="onFocusGroupSelect"
                                        />
                                    </v-col>
                                    <v-col cols="7">
                                        <v-select
                                            v-model="attributesMap[element.id].item"
                                            :items="filterItems"
                                            label="Фильтры"
                                            value-key="value"
                                            :disabled="!attributesMap[element.id].group"
                                            @focus="onFocusFilter(element.id)"
                                            @blur="onBlurFilter(element.id)"
                                            @select="onBlurFilter(element.id)"
                                        />
                                    </v-col>
                                </template>
                            </v-row>
                        </template>
                    </draggable>
                </template>
            </form-card>
        </v-col>
        <v-col cols="6">
            <div class="attributes-list">
                <form-card>
                    <template #icon>
                        <v-svg :path="SvgPaths.INBOX_OUT"/>
                    </template>
                    <template #body>
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
                    </template>
                </form-card>
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
    }

    .sortable-ghost {
        opacity: .3;
    }
</style>
