<script lang="ts" setup>
    import { useUsersService } from '@modules/users/composables/use-users-service'
    import { useUsersTable } from '@modules/users/composables/use-users-table'

    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    import type { IUser } from '@proshop-app/types'

    import { SvgPaths } from '@shared/enums/svg-paths'

    defineEmits<{
        (e: 'open:create-modal'): void
        (e: 'open:edit-modal', value: IUser): void
        (e: 'delete:user', value: IUser): void
    }>()

    const { cols } = useUsersTable()
    const { users } = useUsersService()
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
            Таблица пользователей
        </template>
        <template #body>
            <v-data-table
                :cols="cols"
                :rows="users"
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
                        @click="$emit('open:edit-modal', row)"
                    >
                        <v-icon>fas fa-pen</v-icon>
                    </v-button>
                    <v-button
                        class="ml-1"
                        color="var(--error)"
                        elevation="2"
                        text
                        @click="$emit('delete:user', row)"
                    >
                        <v-icon>fas fa-trash-alt</v-icon>
                    </v-button>
                </template>
                <template #image="{ row }">
                    <div class="d-flex justify-center align-center">
                        <img
                            v-if="row.image"
                            style="height: 30px; width: auto"
                            alt=""
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
