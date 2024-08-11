<script lang="ts" setup>
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { useCategoriesTable } from '@modules/categories/composables/use-categories-table'

    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const { categories } = useCategoriesService()
    const { cols, onEditRow, onCreateRow, onDeleteRow } = useCategoriesTable()
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
                        <v-toolbar-logo/>
                        <v-spacer/>
                        <v-toolbar-items>
                            <v-button
                                color="primary"
                                elevation="5"
                                @click="onCreateRow"
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
                        @click="onEditRow(row)"
                    >
                        <v-icon>fas fa-pen</v-icon>
                    </v-button>
                    <v-button
                        class="ml-1"
                        color="var(--error)"
                        elevation="2"
                        text
                        @click="onDeleteRow(row)"
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
                        >
                        <v-icon v-else>
                            fas fa-box
                        </v-icon>
                    </div>
                </template>
            </v-data-table>
        </template>
    </form-card>
</template>
