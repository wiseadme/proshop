<script lang="ts" setup>
    import { ref } from 'vue'
    import { useUsersService } from '@modules/user/composables/use-users-service'
    import UsersTable from '@modules/user/components/UsersTable'
    import UserActionsModal from '@modules/user/components/UserActionsModal'

    const { createUser, deleteUser, fetchUsers } = useUsersService()
    const openModal = ref(false)

    const onOpenCreateModal = () => {
        openModal.value = true
    }

    const onDeleteUser = (user) => {
        deleteUser(user)
    }

    const onCreateUser = (user) => {
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
