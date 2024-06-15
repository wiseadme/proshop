<script lang="ts" setup>
    import GroupsList from '@modules/groups/components/GroupsList.vue'
    import GroupsFormModal from '../components/modals/GroupsFormModal.vue'

</script>
<template>
    <div class="groups-page">
        <v-layout>
            <v-row>
                <v-col
                    cols="8"
                    offset="2"
                >
                    <groups-list/>
                </v-col>
                <v-col>
                    <groups-form-modal/>
                </v-col>
            </v-row>
        </v-layout>
    </div>
</template>
