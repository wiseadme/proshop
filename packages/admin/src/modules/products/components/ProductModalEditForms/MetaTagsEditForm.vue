<script lang="ts" setup>
    import { computed, unref } from 'vue'
    import { ModalCard } from '@shared/components/Modals'
    import { useProductMetaTags } from '@modules/products/composables/use-product-metatags'

    const { currentEditableMetaTag, onUpdateMetaTags } = useProductMetaTags()

    const metaTagKeys = computed<string[]>(() => Object.keys(unref(currentEditableMetaTag)?.props! || {}))

    const clearEditableMetaTag = () => {
        currentEditableMetaTag.value = null
    }
</script>
<template>
    <modal-card>
        <template #title>
            Редактирование мета тега
        </template>
        <template
            v-if="currentEditableMetaTag"
            #content
        >
            <v-text-field
                v-for="key in metaTagKeys"
                :key="key"
                v-model="currentEditableMetaTag.props[key]"
                :label="key"
            />
        </template>
        <template #actions>
            <v-button
                color="success"
                elevation="2"
                width="120"
                class="app-border-radius mr-2"
                @click="onUpdateMetaTags"
            >
                Сохранить
            </v-button>
            <v-button
                color="secondary"
                elevation="2"
                width="120"
                class="app-border-radius"
                @click="clearEditableMetaTag"
            >
                Отменить
            </v-button>
        </template>
    </modal-card>
</template>
