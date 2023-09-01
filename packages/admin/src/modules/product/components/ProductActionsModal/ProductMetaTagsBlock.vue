<script lang="ts" setup>
    import MetaTagEditForm from './MetaTagsEditForm.vue'
    import { useProductMetaTags } from '@modules/product/composables/use-product-metatags'
    import { useProduct } from '@modules/product/composables/use-product'
    // Helpers
    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    // @ts-ignore
    import draggable from 'vuedraggable'
    import FormCard from '@shared/components/FormCard/FormCard.vue'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useProduct()
    const {
        availableMetaTags,
        metaTag,
        editTag
    } = useProductMetaTags()

    const onChange = () => {
    }
    const pullFunction = () => {
    }
</script>
<template>
    <v-row class="pa-4 app-border-radius">
        <v-col cols="6">
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_IN"/>
                </template>
                <template #body>
                    <draggable
                        :list="model.seo.metatags"
                        item-key="id"
                        group="metaTags"
                        class="draggable-container exists-tags"
                        @change="onChange"
                    >
                        <template #item="{element}">
                            <div
                                v-if="element !== metaTag"
                                class="d-flex justify-start align-center my-1 py-4 px-3 meta-tag-item app-border-radius"
                                @click="editTag(element)"
                            >
                                <v-icon
                                    class="mr-3"
                                    color="primary"
                                >
                                    fas fa-grip-vertical
                                </v-icon>
                                <span>
                                    {{ descriptorToMetaTag(element.props) }}
                                </span>
                                <v-spacer></v-spacer>
                            </div>
                            <meta-tag-edit-form v-else/>
                        </template>
                    </draggable>
                </template>
            </form-card>
        </v-col>
        <v-col cols="6">
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.INBOX_OUT"/>
                </template >
                <template #body>
                    <draggable
                        :list="availableMetaTags"
                        item-key="id"
                        :group="{ name: 'metaTags', pull: pullFunction }"
                        class="draggable-container"
                        @dragend="onChange"
                        @change="onChange"
                    >
                        <template #item="{element}">
                            <div
                                class="d-flex justify-start align-center my-1 py-4 px-3 meta-tag-item app-border-radius"
                                @click="editTag(element)"
                            >
                                <v-icon
                                    class="mr-3"
                                    color="grey lighten-2"
                                >
                                    fas fa-grip-vertical
                                </v-icon>
                                <span>
                                    {{ descriptorToMetaTag(element.props) }}
                                </span>
                                <v-spacer></v-spacer>
                            </div>
                        </template>
                    </draggable>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
<style lang="scss" scoped>
  .draggable-container {
    min-height: 100px;
    border-radius: 10px;
    overflow: hidden !important;
  }
  .meta-tag-item {
    border: 1px dotted #dcdcdc !important;
  }
</style>
