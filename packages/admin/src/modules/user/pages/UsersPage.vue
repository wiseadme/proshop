<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useUsersService } from '@modules/user/composables/use-users-service'
  import UsersTable from '@modules/user/components/UsersTable'
  import UserActionsModal from '@modules/user/components/UserActionsModal'

  export default defineComponent({
    name: 'users-page',
    components: { UsersTable, UserActionsModal },
    setup() {
      const { createUser, deleteUser, fetchUsers, users } = useUsersService()
      const openModal = ref(false)

      const onOpenCreateModal = () => {
        openModal.value = true
      }

      const onCreateUser = (user) => {
        createUser(user).then(() => openModal.value = false)
      }

      const onDeleteUser = (user) => [
        deleteUser(user)
      ]

      fetchUsers()

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

      return {
        cols,
        users,
        openModal,
        onDeleteUser,
        onOpenCreateModal,
        onCreateUser
      }
    }
  })
</script>
<template>
  <v-layout>
    <v-row>
      <v-col>
        <users-table
          :cols="cols"
          :rows="users"
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
