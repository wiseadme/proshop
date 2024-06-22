<script lang="ts" setup>
    import GroupsForm from '@modules/groups/components/GroupsForm/GroupsForm.vue'
    import {
        useGroupsFormModal
    } from '@modules/groups/composables/view/groups/use-groups-form-modal'

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
