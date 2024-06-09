<script lang="ts" setup>
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { useGroups } from "@modules/groups/composables/use-groups"

    const { variants, model } = useGroups()
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #title>
            Группы вариантов
        </template>
        <template #body>
            <v-select
                v-model="model.variant"
                label="Вариант"
                :items="variants"
                value-key="name"
            />
        </template>
    </form-card>
</template>
