<script lang="ts" setup>
    import { defineAsyncComponent } from 'vue'

    const GroupsModal = defineAsyncComponent({
        loader: () => import('@modules/groups/components/modals/GroupsFormModal.vue')
    })

    const OptionsModal = defineAsyncComponent({
        loader: () => import('@modules/groups/components/modals/OptionsFormModal.vue')
    })

    const GroupsList = defineAsyncComponent({
        loader: () => import('@modules/groups/components/GroupsList.vue')
    })

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
                    <groups-modal/>
                    <options-modal/>
                </v-col>
            </v-row>
        </v-layout>
    </div>
</template>
