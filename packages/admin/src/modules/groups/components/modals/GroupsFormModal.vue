<script lang="ts" setup>
    import GroupsForm from '@modules/groups/components/GroupsForm.vue'
    import { useGroupsFormModal } from '@modules/groups/composables/view/use-groups-form-modal.ts'

    const { isGroupModalVisible } = useGroupsFormModal()

</script>
<template>
    <v-modal
        v-model="isGroupModalVisible"
        width="800"
        overlay
        transition="scale-in"
    >
        <groups-form @close="isGroupModalVisible = false"/>
    </v-modal>
</template>
