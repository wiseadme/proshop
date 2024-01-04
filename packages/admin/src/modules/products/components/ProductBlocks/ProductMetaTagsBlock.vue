<script lang="ts" setup>
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import DraggableItemsList from '@shared/components/DraggableItemsList/DraggableItemsList.vue'
    import { FormCard } from '@shared/components/FormCard/'
    import { useProductMetaTags } from '@modules/products/composables/use-product-metatags'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    // Helpers
    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { IMetaTag } from '@proshop/types'

    const { model } = useProductModel()

    const {
        availableMetaTags,
        setForEditing,
        onUpdateMetaTags,
        onAddMetaTag,
        onRemoveMetaTag
    } = useProductMetaTags()

    const groupSymbol = Symbol.for('metaTags')
    const pullFunction = () => {
    }
</script>
<template>
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
                        @add="onAddMetaTag"
                        @update="onUpdateMetaTags"
                        @remove="onRemoveMetaTag"
                    >
                        <template #title="{item}">
                            {{ descriptorToMetaTag((item as IMetaTag).props) }}
                        </template>
                        <template #tooltip="{item}">
                            {{ descriptorToMetaTag((item as IMetaTag).props) }}
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
                                {{ descriptorToMetaTag((item as IMetaTag).props) }}
                            </span>
                        </template>
                        <template #tooltip="{item}">
                            {{ descriptorToMetaTag((item as IMetaTag).props) }}
                        </template>
                    </draggable-items-list>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
