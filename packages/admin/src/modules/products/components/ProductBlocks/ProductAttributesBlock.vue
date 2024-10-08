<script lang="ts" setup>
    // Composables
    import { useProductAttributes } from '@modules/products/composables/use-product-attributes'
    import { useProductModel } from '@modules/products/composables/use-product-model'

    // Components
    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    // Enums
    import { ATTRIBUTE_DRAG_GROUP } from '@modules/products/constants/symbols'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useProductModel()

    const {
        availableAttributes,
        onRemoveAttribute,
        onUpdateAttributes,
        onAddAttribute,
        setForEditing,
    } = useProductAttributes()

    const pullFunction = () => {
    }

</script>
<template>
    <v-row>
        <v-col
            cols="6"
            class="used-attributes app-border-radius"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_IN"/>
                </template>
                <template #title>
                    Текущие атрибуты товара
                </template>
                <template #body>
                    <draggable-items-list
                        v-model="model.attributes"
                        item-key="key"
                        :group="ATTRIBUTE_DRAG_GROUP"
                        class="draggable-container"
                        editable
                        @edit="setForEditing"
                        @add="onAddAttribute"
                        @remove="onRemoveAttribute"
                        @update="onUpdateAttributes"
                    >
                        <template #title="{item}">
                            <span>{{ item.key }}</span>
                        </template>
                        <template #subtitle="{item}">
                            <span>{{ item.value }}</span>
                        </template>
                        <template #tooltip="{item}">
                            <span>{{ item.key }} : {{ item.value }}</span>
                        </template>
                    </draggable-items-list>
                </template>
            </form-card>
        </v-col>
        <v-col cols="6">
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_OUT"/>
                </template>
                <template #title>
                    Коллекция атрибутов
                </template>
                <template #body>
                    <draggable-items-list
                        v-model="availableAttributes"
                        item-key="key"
                        :group="{ name: ATTRIBUTE_DRAG_GROUP, pull: pullFunction }"
                    >
                        <template #title="{item}">
                            {{ item.key }}
                        </template>
                        <template #subtitle="{item}">
                            {{ item.value }}
                        </template>
                        <template #tooltip="{item}">
                            <span>{{ item.key }} : {{ item.value }}</span>
                        </template>
                    </draggable-items-list>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
<style lang="scss" scoped>
    .draggable-container {
        min-height: 400px;
        border-radius: 10px;
    }

    .attribute {
        cursor: pointer;
    }

    .sortable-ghost {
        opacity: .3;
    }
</style>
