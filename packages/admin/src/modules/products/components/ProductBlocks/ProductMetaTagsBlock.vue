<script lang="ts" setup>
    import { computed, unref } from 'vue'
    import MetaTagEditForm from '@modules/products/components/ProductModalEditForms/MetaTagsEditForm.vue'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import DraggableItemsList from '@shared/components/DraggableItemsList/DraggableItemsList.vue'
    import { FormCard } from '@shared/components/FormCard/'
    import { useProductMetaTags } from '@modules/products/composables/use-product-metatags'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    // Helpers
    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useProductModel()
    const {
        availableMetaTags,
        currentEditableMetaTag,
        setForEditing,
        onUpdateMetaTags,
    } = useProductMetaTags()

    const groupSymbol = Symbol.for('metaTags')

    const showEditModal = computed(() => Boolean(unref(currentEditableMetaTag)))
    const pullFunction = () => {
    }
</script>
<template>
    <v-row class="app-border-radius">
        <v-modal
            v-model="showEditModal"
            transition="scale-in"
            overlay
        >
            <MetaTagEditForm/>
        </v-modal>
        <v-col cols="6">
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_IN"/>
                </template>
                <template #title>
                    Текущие метатеги товара
                </template>
                <template #body>
                    <draggable-items-list
                        v-model="model.seo.metatags"
                        item-key="id"
                        :group="groupSymbol"
                        editable
                        @edit="setForEditing"
                        @change="onUpdateMetaTags"
                    >
                        <template #title="{item}">
                            {{ descriptorToMetaTag(item.props) }}
                        </template>
                        <template #tooltip="{item}">
                            {{ descriptorToMetaTag(item.props) }}
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
                    Коллекция метатегов
                </template>
                <template #body>
                    <draggable-items-list
                        v-model="availableMetaTags"
                        item-key="id"
                        :group="{ name: groupSymbol, pull: pullFunction }"
                    >
                        <template #title="{item}">
                            <span>
                                {{ descriptorToMetaTag(item.props) }}
                            </span>
                        </template>
                        <template #tooltip="{item}">
                            {{ descriptorToMetaTag(item.props) }}
                        </template>
                    </draggable-items-list>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
<style lang="scss" scoped>
</style>
