<script lang="ts" setup>
    import { useCategoriesService } from '@modules/category/composables/use-categories-service'
    import { useCategoriesTable } from '@modules/category/composables/use-categories-table'
    import { ICategory } from '@ecommerce-platform/types'

    defineEmits<{
        (e: 'open:create-modal'): void
        (e: 'open:edit-modal', row: ICategory): void
        (e: 'delete:category', row: ICategory): void
    }>()

    const { categories } = useCategoriesService()
    const { cols } = useCategoriesTable()
</script>
<template>
    <v-data-table
        :cols="cols"
        :rows="categories"
        :footer-options="{
            counts: {
                displayColor: 'primary',
                rowsPerPageText: 'кол-во строк'
            },
            pagination: {
                buttonsColor: 'primary',
                displayColor: 'primary'
            }
        }"
        class="elevation-2 app-border-radius"
        show-sequence
    >
        <template #toolbar>
            <v-toolbar>
                <v-toolbar-logo></v-toolbar-logo>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-button
                        color="primary"
                        elevation="5"
                        @click="$emit('open:create-modal')"
                    >
                        <v-icon
                            size="14"
                            sm
                        >
                            fas fa-plus
                        </v-icon>
                    </v-button>
                </v-toolbar-items>
            </v-toolbar>
        </template>
        <template #pagination-text="{start, last, length}">
            <span>{{ `с ${ start } по ${ last } из ${ length }` }}</span>
        </template>
        <template #actions="{row}">
            <v-button
                color="var(--warning)"
                elevation="2"
                text
                @click="$emit('open:edit-modal', row)"
            >
                <v-icon>fas fa-pen</v-icon>
            </v-button>
            <v-button
                class="ml-1"
                color="var(--error)"
                elevation="2"
                text
                @click="$emit('delete:category', row)"
            >
                <v-icon>fas fa-trash-alt</v-icon>
            </v-button>
        </template>
        <template #image="{ row }">
            <div class="d-flex justify-center align-center">
                <img
                    v-if="row.image"
                    style="height: 30px; width: auto"
                    :src="row.image"
                />
                <v-icon v-else>
                    fas fa-box
                </v-icon>
            </div>
        </template>
    </v-data-table>
</template>
