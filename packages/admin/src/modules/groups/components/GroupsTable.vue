<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
    import { useGroupsFormModal } from '@modules/groups/composables/view/use-groups-form-modal'
    import { useGroupsTable } from '@modules/groups/composables/view/use-groups-table'
    import { useOptionsFormModal } from '@modules/groups/composables/view/use-options-form-modal'

    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const {
        cols,
        rows,
        getGroups,
        onOpenGroupModal,
        onOpenOptionsModal,
        onDeleteGroup
    } = useGroupsTable()

    onBeforeMount(() => {
        getGroups()
    })
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
            Таблица групп вариантов
        </template>
        <template #body>
            <v-data-table
                :cols="cols"
                :rows="rows"
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
                                @click="onOpenGroupModal"
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
                    <v-tooltip
                        top
                        color="grey darken-3"
                        offset-y="-10"
                    >
                        <template #activator="{ on }">
                            <v-button
                                color="var(--primary)"
                                elevation="2"
                                text
                                v-on="on"
                                @click="onOpenGroupModal(row)"
                            >
                                <v-icon>fas fa-pen</v-icon>
                            </v-button>
                        </template>
                        <span>Редактировать группу</span>
                    </v-tooltip>
                    <v-tooltip
                        top
                        color="grey darken-3"
                        offset-y="-10"
                    >
                        <template #activator="{ on }">
                            <v-button
                                color="var(--primary)"
                                elevation="2"
                                text
                                v-on="on"
                                @click="onOpenOptionsModal(row)"
                            >
                                <v-icon>fa-solid fa-table-list</v-icon>
                            </v-button>
                        </template>
                        <span>Редактировать опции</span>
                    </v-tooltip>
                    <v-button
                        class="ml-1"
                        color="var(--error)"
                        elevation="2"
                        text
                        @click="() => {}"
                    >
                        <v-icon>fas fa-trash-alt</v-icon>
                    </v-button>
                </template>
            </v-data-table>
        </template>
    </form-card>
</template>
