<script lang="ts" setup>
    import {
        ref,
        unref,
        watch,
    } from 'vue'
    import { useMetaTag } from '@modules/metatag/composables/use-meta-tag'
    import { useMetaTagsService } from '@modules/metatag/composables/use-meta-tags-service'
    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { clone } from '@shared/helpers'
    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    import { IMetaTag } from '@proshop/types'

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
                        <draggable-items-list
                            :items="metaTags"
                            editable
                            @edit="onEditMetaTag"
                            @delete="onDeleteMetaTag"
                        >
                            <template #title="{item}">
                                {{ descriptorToMetaTag(item.props) }}
                            </template>
                        </draggable-items-list>
                    </template>
                </v-col>
            </v-row>
        </v-layout>
    </div>
</template>
<style lang="scss">
    .meta-tag-item {
        cursor: pointer;
        min-height: 50px;
        //
        //&:active {
        //  box-shadow: none !important;
        //}
    }
</style>
