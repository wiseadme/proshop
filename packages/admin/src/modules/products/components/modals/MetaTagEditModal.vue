<script lang="ts" setup>
    import { computed, unref } from 'vue'
    import { ModalCard } from '@shared/components/Modals'
    import { useProductMetaTags } from '@modules/products/composables/use-product-metatags'

    const {
        currentEditableMetaTag,
        isMetaTagEditMode,
        onUpdateMetaTags,
        closeEditModal,
    } = useProductMetaTags()

    const metaTagKeys = computed<string[]>(() => Object.keys(unref(currentEditableMetaTag)?.props || {}))

</script>
<template>
    <v-modal
        v-model="isMetaTagEditMode"
        transition="scale-in"
        overlay
    >
        <modal-card
            v-if="currentEditableMetaTag"
            @close="closeEditModal"
        >
            <template #title>
                Редактирование мета тега
            </template>
            <template #content>
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
            </template>
        </modal-card>
    </v-modal>
</template>
