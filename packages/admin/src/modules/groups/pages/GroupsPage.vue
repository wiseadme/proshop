<script lang="ts" setup>
    import { onBeforeMount } from 'vue'
    import { useGroupsService } from '@modules/groups/composables/use-groups-service'
    import GroupsForm from '@modules/groups/components/GroupsForm.vue'


    const { loadVariants } = useGroupsService()

    onBeforeMount(loadVariants)

    // createGroup()
</script>
<template>
    <v-row>
        <v-col>
            <groups-form/>
        </v-col>
    </v-row>
</template>
