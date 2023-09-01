<script lang="ts" setup>
    import { FormCard } from '@shared/components/FormCard'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import { useProductAttributes } from '@modules/products/composables/use-product-attributes'
    import { useProduct } from '@modules/products/composables/use-product'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import DraggableItemsList from '@shared/components/DraggableItemsList/DraggableItemsList.vue'
    import AttributesEditForm from '@modules/products/components/EditForms/AttributesEditForm.vue'

    const { model } = useProduct()
    const groupSymbol = Symbol.for('attributes')

    const {
        currentEditableAttribute,
        availableAttributes,
        setForEditing,
    } = useProductAttributes()

    const pullFunction = () => {
    }

</script>
<template>
    <transition name="slide-down">
        <attributes-edit-form v-if="currentEditableAttribute"/>
    </transition>
    <v-row class="pa-4">
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
