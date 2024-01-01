<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    import { useMetaTagsService } from '@modules/metatags/composables/use-meta-tags-service'
    import { useMetaTagForm } from '@modules/metatags/composables/use-meta-tag-form'

    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { VSvg } from '@shared/components/VSvg'
    import { FormCard } from '@shared/components/FormCard'

    import { descriptorToMetaTag } from '@shared/helpers/metatag'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useMetaTag } from '@modules/metatags/composables/use-meta-tag'

    const { showFormModal } = useMetaTagForm()
    const { metaTags, fetchMetaTags } = useMetaTagsService()
    const { onEditMetaTag, onDeleteMetaTag } = useMetaTag()

    onBeforeMount(fetchMetaTags)
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.SHARE_NODES"/>
        </template>
        <template #title>
            Список доступных метатегов
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="showFormModal = true"
            >
                Добавить
            </v-button>
        </template>
        <template #body>
            <draggable-items-list
                v-model="metaTags"
                deletable
                editable
                @edit="onEditMetaTag"
                @delete="onDeleteMetaTag"
            >
                <template #title="{item}">
                    {{ descriptorToMetaTag(item.props) }}
                </template>
            </draggable-items-list>
        </template>
    </form-card>
</template>
