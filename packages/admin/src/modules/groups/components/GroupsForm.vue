<script lang="ts" setup>
    import { FormCard } from '@shared/components/FormCard'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { VSvg } from '@shared/components/VSvg'
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
    </form-card>
</template>
