<script lang="ts" setup>
    import { ref } from 'vue'

    import { useUsersService } from '@modules/users/composables/use-users-service'

    import UserActionsModal from '@modules/users/components/UserActionsModal'
    import UsersTable from '@modules/users/components/UsersTable'

    import { IUser } from '@proshop/types'

    const { createUser, deleteUser, fetchUsers } = useUsersService()
    const openModal = ref(false)

    const onOpenCreateModal = () => {
        openModal.value = true
    }

    const onDeleteUser = (user: IUser) => {
        deleteUser(user)
    }

    const onCreateUser = (user: IUser) => {
        createUser(user).then(() => openModal.value = false)
    }

    fetchUsers()
</script>
<template>
    <v-layout>
        <v-row>
            <v-col>
                <users-table
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
