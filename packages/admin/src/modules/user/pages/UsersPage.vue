<script setup lang="ts">
  import { useUserService } from '@modules/user/service/users.service'
  import UsersTable from '@modules/user/components/UsersTable'
  import UserActionsModal from '@modules/user/components/UserActionsModal'

  const usersService = useUserService()

  let openModal = $ref(false)

  const onOpenCreateModal = () => {
    openModal = true
  }

  const onCreateUser = (user) => {
    usersService.createUser(user).then(() => openModal = false)
  }

  const onDeleteUser = (user) => [
    usersService.deleteUser(user)
  ]

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
          @open:create-modal="onOpenCreateModal"
          @delete:user="onDeleteUser"
        />
      </v-col>
    </v-row>
    <user-actions-modal
      v-model="openModal"
      @create:user="onCreateUser"
    />
  </v-layout>
</template>
