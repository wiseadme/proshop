<script lang="ts" setup>
    import { computed, unref } from 'vue'
    // Composables
    import { useProductAttributes } from '@modules/products/composables/use-product-attributes'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    // Components
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import DraggableItemsList from '@shared/components/DraggableItemsList/DraggableItemsList.vue'
    import AttributesEditForm from '@modules/products/components/ProductModalEditForms/AttributesEditForm.vue'
    // Enums
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useProductModel()
    const groupSymbol = Symbol.for('attributes')

    const {
        currentEditableAttribute,
        availableAttributes,
        onRemoveAttribute,
        onUpdateAttributes,
        onAddAttribute,
        setForEditing,
    } = useProductAttributes()

    const showEditModal = computed(() => Boolean(unref(currentEditableAttribute)))

    const pullFunction = () => {
    }

</script>
<template>
    <v-row>
        <v-modal
            v-model="showEditModal"
            transition="scale-in"
            overlay
        >
            <attributes-edit-form />
        </v-modal>
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
                        :group="groupSymbol"
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
                        :group="{ name: groupSymbol, pull: pullFunction }"
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
