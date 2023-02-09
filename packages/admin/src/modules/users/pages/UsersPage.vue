<script setup lang="ts">
  import { useUsersService } from '@modules/users/service/users.service'
  import UsersTable from '@modules/users/components/UsersTable'
  // import { IUser } from '@ecommerce-platform/types'

  const usersService = useUsersService()

  usersService.fetchUsers()

  const cols = $ref([
    {
      key: 'actions',
      title: 'Действия',
      align: 'center',
      width: '150'
    },
    {
      key: 'firstName',
      title: 'ФИО',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => `${ row.firstName } ${ row.secondName }`,
      emit: true
    },
    {
      key: 'roles',
      title: 'Роли',
      width: '300',
      resizeable: true,
      sortable: true,
      filterable: true,
      format: (row) => row.roles.toString()
    },
  ])
</script>
<template>
  <v-layout>
    <v-row>
      <v-col>
        <users-table
          :cols="cols"
          :rows="usersService.users"
        />
      </v-col>
    </v-row>
  </v-layout>
</template>
