<script setup lang="ts">
  import { CustomersTable } from '@modules/customers/components/CustomersTable'
  import { useCustomersService } from '@modules/customers/service/customera.service'

  const customersService = useCustomersService()

  customersService.fetchCustomers().then(res => {
    console.log(res)
  })

  const cols = $ref([
    {
      key: 'name',
      title: 'Имя',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.name
    },
    {
      key: 'phone',
      title: 'Телефон',
      width: '250',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.phone
    },
    {
      key: 'image',
      title: 'Фото',
      width: '150',
      resizeable: true,
      sortable: true,
      filterable: true
    },
  ])

</script>
<template>
  <div class="customers-page">
    <v-row>
      <v-col>
        <customers-table
          :cols="cols"
          :rows="customersService.customers"
        />
      </v-col>
    </v-row>
  </div>
</template>
