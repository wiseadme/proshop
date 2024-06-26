<script lang="ts" setup>
    import { onMounted } from 'vue'

    import { useUnit } from '@modules/units/composables/use-unit'
    import { useUnitsService } from '@modules/units/composables/use-units-service'

    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'


    const { units, getUnits } = useUnitsService()

    const {
        showUnitForm,
        onEditUnit,
        onDeleteUnit,
    } = useUnit()

    onMounted(getUnits)

</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #title>
            Измерения
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="showUnitForm = true"
            >
                Добавить
            </v-button>
        </template>
        <template #body>
            <items-list
                :items="units"
                @delete="onDeleteUnit"
                @edit="onEditUnit"
            >
                <template #title="{item}">
                    <span>{{ item.value }}</span>
                </template>
            </items-list>
        </template>
    </form-card>
</template>
