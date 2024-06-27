<script lang="ts" setup>
    import GroupsTable from '@modules/groups/components/GroupsTable.vue'
    import GroupsModal from '@modules/groups/components/modals/GroupsFormModal.vue'
    import OptionsModal from '@modules/groups/components/modals/OptionsFormModal.vue'

</script>
<template>
    <div class="groups-page">
        <v-layout>
            <v-row>
                <v-col cols="12">
                    <groups-table/>
                </v-col>
                <v-col>
                    <groups-modal/>
                    <options-modal/>
                </v-col>
            </v-row>
        </v-layout>
    </div>
</template>
