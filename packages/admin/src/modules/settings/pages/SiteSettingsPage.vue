<script lang="ts" setup>
    import { onBeforeMount } from 'vue'

    import { useSite } from '@modules/settings/composables/use-site'

    import { useRightSidebar } from '@shared/composables/use-right-sidebar'

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
