<script lang="ts" setup>
    import GroupsForm from '@modules/groups/components/GroupsForm/GroupsForm.vue'
    import { useGroupsFormModal } from '@modules/groups/composables/use-groups-form-modal'

    const { showFormModal } = useGroupsFormModal()

</script>
<template>
    <v-modal
        v-model="showFormModal"
        width="800"
        overlay
        transition="scale-in"
    >
        <groups-form @close="showFormModal = false"/>
    </v-modal>
</template>
