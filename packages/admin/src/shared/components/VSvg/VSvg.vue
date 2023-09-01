<script lang="ts" setup>
    import { computed } from 'vue'

    const { path, viewBox = '0 0 512 512', color = 'white', width = 28 } = defineProps<{
        path: string
        viewBox?: string
        color?: string
        width?: number | string
    }>()

    const classes = computed(() => ({}))

    const styles = computed(() => ({
        fill: color,
        strokeWidth: 10,
    }))
</script>
<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        :class="classes"
        :style="{width: `${width}px`}"
    >
        <path
            :d="path"
            :style="styles"
        />
    </svg>
</template>
