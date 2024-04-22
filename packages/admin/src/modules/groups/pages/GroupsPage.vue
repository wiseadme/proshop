<script lang="ts" setup>
    import { useGroupsService } from '@modules/groups/composables/use-groups-service.ts'
    import { onBeforeMount } from 'vue'

    const { loadInitItems } = useGroupsService()

    onBeforeMount(loadInitItems)

    // createGroup()
</script>
<template>
    <v-row>
        <v-col>
            <h1>Groups page</h1>
        </v-col>
    </v-row>
</template>
