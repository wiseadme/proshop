<script lang="ts" setup>
    // import { ref } from 'vue'
    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const onClick = () => {
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
