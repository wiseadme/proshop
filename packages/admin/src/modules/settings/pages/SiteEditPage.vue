<script lang="ts" setup>
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'
    import { useRoute } from 'vue-router'

    const { activeItem } = useRightSidebar()

    console.log(useRoute())

</script>
<template>
    <v-layout class="site-page">
        <component :is="activeItem.component"/>
    </v-layout>
</template>
<style lang="scss">

</style>
