<script lang="ts" setup>
    import { VSvg } from '@shared/components/VSvg'
    import { FormCard } from '@shared/components/FormCard'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useCategoriesTable } from '@modules/categories/composables/use-categories-table'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { RouteNames } from '@modules/categories/enums/route-names'
    import { ICategory } from '@proshop/types'

    defineEmits<{
        (e: 'open:create-modal'): void
        (e: 'open:edit-modal', row: ICategory): void
        (e: 'delete:category', row: ICategory): void
    }>()

    const { categories } = useCategoriesService()
    const { cols } = useCategoriesTable()
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg
                :path="SvgPaths.TABLE_LIST"
                view-box="0 -30 512 512"
            />
        </template>
        <template #title>
            Таблица категорий
        </template>
        <template #body>
            <v-data-table
                :cols="cols"
                :rows="categories"
                :footer-options="{
                    counts: {
                        displayColor: 'primary',
                        rowsPerPageText: 'кол-во строк',
                        rowsPerPageOptions: [20, 40, 60, 80]
                    },
                    pagination: {
                        buttonsColor: 'primary',
                        displayColor: 'primary'
                    }
                }"
                class="app-border-radius"
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
                    <span>{{ `с ${start} по ${last} из ${length}` }}</span>
                </template>
                <template #actions="{row}">
                    <v-button
                        color="var(--primary)"
                        elevation="2"
                        text
                        @click="$router.push({
                            name: RouteNames.CATEGORY_EDIT,
                            params: {
                                action: 'edit',
                                categoryId: row.id,
                                section: 'info'
                            }})"
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
    </form-card>
</template>
