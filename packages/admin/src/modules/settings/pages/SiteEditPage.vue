<script lang="ts" setup>
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'
    import { useSite } from '@modules/settings/composables/use-site'
    import { onBeforeMount } from 'vue'

    const { activeItem } = useRightSidebar()
    const { getSite } = useSite()

    onBeforeMount(getSite)
</script>
<template>
    <v-layout class="site-settings-page">
        <component
            :is="activeItem.component"
            v-if="activeItem"
        />
    </v-layout>
</template>
<style lang="scss">

</style>
