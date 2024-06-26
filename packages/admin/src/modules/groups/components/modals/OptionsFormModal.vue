<script lang="ts" setup>
    import { useOptionsFormModal } from '@modules/groups/composables/view/use-options-form-modal'

    import OptionsForm from '@modules/groups/components/OptionsForm/OptionsForm.vue'

    const { isOptionsModalVisible } = useOptionsFormModal()

</script>
<template>
    <v-modal
        v-model="isOptionsModalVisible"
        width="800"
        overlay
        transition="scale-in"
    >
        <options-form @close="isOptionsModalVisible = false"/>
    </v-modal>
</template>
