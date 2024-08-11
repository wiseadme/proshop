<script lang="ts" setup>
    import { useCustomers } from '@modules/customers/composables/use-customers'
    import { useCustomersTable } from '@modules/customers/composables/use-customers-table'

    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const { cols } = useCustomersTable()
    const { customers, loadCustomers } = useCustomers()

    loadCustomers()

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
            Таблица клиентов
        </template>
        <template #body>
            <v-data-table
                :cols="cols"
                :rows="customers"
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
                show-sequence
            >
                <template #pagination-text="{start, last, length}">
                    <span>{{ `с ${start} по ${last} из ${length}` }}</span>
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
