<script lang="ts" setup>
    import {
        ref,
        unref,
        watch,
    } from 'vue'
    import { useMetaTag } from '@modules/metatags/composables/use-meta-tag'
    import { useMetaTagsService } from '@modules/metatags/composables/use-meta-tags-service'
    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { clone } from '@shared/helpers'
    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    import { IMetaTag } from '@proshop/types'
    import FormCard from '@shared/components/FormCard/FormCard.vue'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import { SvgPaths } from '@shared/enums/svg-paths'

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
                        <form-card>
                            <template #icon>
                                <v-svg :path="SvgPaths.SHARE_NODES"/>
                            </template>
                            <template #title>
                                Форма генерации метатегов
                            </template>
                            <template #body>
                                <v-text-field
                                    v-model="metaPropertyPattern.key"
                                    :rules="[val => !!val || 'Обязательное поле']"
                                    label="Ключ"
                                />
                                <v-text-field
                                    v-model="metaPropertyPattern.value"
                                    label="Значение по умолчанию"
                                />
                                <div class="py-8">
                                    <code>
                                        {{ displayMeta }}
                                    </code>
                                </div>
                                <v-text-field
                                    v-model="metaProps.order"
                                    type="number"
                                    label="Порядковый номер мета тега"
                                />
                            </template>
                            <template #actions>
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
                            </template>
                        </form-card>
                    </v-form>
                </v-col>
                <v-col
                    xl="8"
                    lg="6"
                    md="12"
                    sm="12"
                >
                    <form-card>
                        <template #icon>
                            <v-svg :path="SvgPaths.SHARE_NODES"/>
                        </template>
                        <template #body>
                            <draggable-items-list
                                v-model="metaTags"
                                deletable
                                @edit="onEditMetaTag"
                                @delete="onDeleteMetaTag"
                            >
                                <template #title="{item}">
                                    {{ descriptorToMetaTag(item.props) }}
                                </template>
                            </draggable-items-list>
                        </template>
                    </form-card>
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
