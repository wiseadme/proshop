<script lang="ts" setup>
    // import { ref } from 'vue'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { VSvg } from '@shared/components/VSvg'
    import { useVK } from '@modules/networks/composables/use-vk'

    const { url } = useVK()

    const onClick = () => {
        console.log(url)
        // window.location.href = url
    }
</script>
<template>
    <v-svg
        :path="SvgPaths.FB"
        width="115"
        color="#6a6a6a"
        class="network-item pa-2"
        view-box="0 -10 512 512"
        @click="onClick"
    />
</template>
<style lang="scss" scoped>
    .network-item {
        cursor: pointer;
    }
</style>
