<script lang="ts" setup>
    import { useCustomersTable } from '@modules/customer/composables/use-customers-table'
    import { useCustomers } from '@modules/customer/composables/use-customers'

    const { cols } = useCustomersTable()
    const { customers, fetchCustomers } = useCustomers()

    fetchCustomers()

</script>
<template>
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
        class="elevation-2 app-border-radius"
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
                />
                <v-icon v-else>
                    fas fa-box
                </v-icon>
            </div>
        </template>
    </v-data-table>
</template>
