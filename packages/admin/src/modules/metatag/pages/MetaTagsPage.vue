<script lang="ts" setup>
    import {
        ref,
        unref,
        watch
    } from 'vue'
    import { useMetaTag } from '@modules/metatag/composables/use-meta-tag'
    import { useMetaTagsService } from '@modules/metatag/composables/use-meta-tags-service'
    import { IMetaTag } from '@ecommerce-platform/types'
    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    import { clone } from '@shared/helpers'
    // @ts-ignore
    import draggable from 'vuedraggable'

    const {
        metaTags,
        fetchMetaTags,
        onDeleteMetaTag,
        onUpdateMetaTag,
        onCreateMetaTag,
    } = useMetaTagsService()

    const {
        isEditMode,
        displayMeta,
        isDescriptorHasKeys,
        saveBtnTitle,
        metaProps,
        metaPropertyPattern,
        addPropsToMeta,
        clearAll,
        onEditMetaTag,
    } = useMetaTag()

    const tags = ref<Maybe<IMetaTag[]>>([])

    const saveMetaTagDescriptor = async () => {
        const meta = unref(metaProps)

        if (unref(isEditMode)) {
            await onUpdateMetaTag(meta)
            isEditMode.value = false
        } else {
            await onCreateMetaTag(meta as IMetaTag)
        }

        setTimeout(clearAll)
    }

    fetchMetaTags()

    watch(metaTags, (newTags) => {
        tags.value = clone(newTags)
    })
</script>
<template>
    <div class="meta-tags-page">
        <v-layout>
            <v-row>
                <v-col
                    xl="4"
                    lg="6"
                    md="12"
                    sm="12"
                >
                    <v-form v-slot="{validate}">
                        <v-card
                            color="white"
                            width="100%"
                            class="elevation-2 app-border-radius"
                        >
                            <v-card-title class="primary--text">
                                <h3>Свойства мета тега</h3>
                            </v-card-title>
                            <v-card-content>
                                <v-text-field
                                    v-model="metaPropertyPattern.key"
                                    :rules="[val => !!val || 'Обязательное поле']"
                                    label="Ключ"
                                />
                                <v-text-field
                                    v-model="metaPropertyPattern.value"
                                    label="Значение по умолчанию"
                                />
                            </v-card-content>
                            <v-card-content>
                                <code>
                                    {{ displayMeta }}
                                </code>
                            </v-card-content>
                            <v-card-content>
                                <v-text-field
                                    v-model="metaProps.order"
                                    type="number"
                                    label="Порядковый номер мета тега"
                                />
                            </v-card-content>
                            <v-card-actions>
                                <v-button
                                    color="var(--primary)"
                                    class="mr-2"
                                    text
                                    @click="addPropsToMeta(validate)"
                                >
                                    Добавить ключ
                                </v-button>
                                <v-button
                                    color="var(--warning)"
                                    class="mr-2"
                                    text
                                    @click="clearAll"
                                >
                                    Сбросить
                                </v-button>
                                <v-button
                                    color="primary"
                                    elevation="2"
                                    :disabled="!isDescriptorHasKeys"
                                    @click="saveMetaTagDescriptor()"
                                >
                                    {{ saveBtnTitle }}
                                </v-button>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
                <v-col
                    xl="8"
                    lg="6"
                    md="12"
                    sm="12"
                >
                    <template v-if="metaTags">
                        <draggable
                            v-model="tags"
                            item-key="_id"
                        >
                            <template #item="{element}">
                                <div
                                    class="d-flex justify-start align-center elevation-2 my-1 py-2 px-3 meta-tag-item white"
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
                                    <v-button
                                        round
                                        color="primary"
                                        elevation="2"
                                        class="mr-2"
                                        @click="onEditMetaTag(element)"
                                    >
                                        <v-icon>
                                            fas fa-pen
                                        </v-icon>
                                    </v-button>
                                    <v-button
                                        round
                                        color="error"
                                        elevation="2"
                                        @click="onDeleteMetaTag(element._id)"
                                    >
                                        <v-icon>
                                            fas fa-times
                                        </v-icon>
                                    </v-button>
                                </div>
                            </template>
                        </draggable>
                    </template>
                </v-col>
            </v-row>
        </v-layout>
    </div>
</template>
<style lang="scss">
  .meta-tag-item {
    cursor: pointer;
    //
    //&:active {
    //  box-shadow: none !important;
    //}
  }
</style>
