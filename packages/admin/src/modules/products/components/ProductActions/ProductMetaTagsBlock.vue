<script lang="ts" setup>
    import MetaTagEditForm from '@modules/products/components/ModalEditForms/MetaTagsEditForm.vue'
    import { useProductMetaTags } from '@modules/products/composables/use-product-metatags'
    import { useProduct } from '@modules/products/composables/use-product'
    // Helpers
    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    // @ts-ignore
    import FormCard from '@shared/components/FormCard/FormCard.vue'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import DraggableItemsList from '@shared/components/DraggableItemsList/DraggableItemsList.vue'

    const { model } = useProduct()
    const {
        availableMetaTags,
        currentEditableMetaTag,
        setForEditing,
    } = useProductMetaTags()

    const groupSymbol = Symbol.for('metaTags')
    const onChange = () => {
    }
    const pullFunction = () => {
    }
</script>
<template>
    <transition name="slide-down">
        <MetaTagEditForm v-if="currentEditableMetaTag"/>
    </transition>
    <v-row class="app-border-radius">
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
                        @change="onChange"
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
