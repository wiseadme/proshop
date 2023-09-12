<script lang="ts" setup>
    import { computed, unref } from 'vue'
    import { useProductMetaTags } from '@modules/products/composables/use-product-metatags'

    const { currentEditableMetaTag } = useProductMetaTags()

    const metaTagKeys = computed<string[]>(() => Object.keys(unref(currentEditableMetaTag)?.props!))

    const clearEditableMetaTag = () => {
        currentEditableMetaTag.value = null
    }
</script>
<template>
    <v-row class="white elevation-2 mb-2 pl-4">
        <v-col
            v-for="key in metaTagKeys"
            :key="key"
            xl="4"
            lg="4"
            md="6"
            sm="11"
        >
            <v-text-field
                v-model="currentEditableMetaTag.props[key]"
                :label="key"
            />
        </v-col>
        <v-spacer/>
        <v-col
            cols="1"
            class="d-flex justify-center align-center"
        >
            <v-icon
                clickable
                size="24"
                @click="clearEditableMetaTag"
            >
                fas fa-times
            </v-icon>
        </v-col>
    </v-row>
</template>
