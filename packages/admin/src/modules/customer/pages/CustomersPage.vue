<script lang="ts">
  import { defineComponent } from 'vue'
  import { CustomersTable } from '@modules/customer/components/CustomersTable'

  export default defineComponent({
    name: 'customer-page',
    components: {
      CustomersTable
    },
    setup() {


      return {}
    }
  })
</script>
<template>
  <div class="customers-page">
    <v-row>
      <v-col>
        <customers-table/>
      </v-col>
    </v-row>
  </div>
</template>
