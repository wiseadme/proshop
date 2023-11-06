<script lang="ts" setup>
    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'

    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useFilterItemForm } from '@modules/filters/composables/use-filter-item-form'

    const { filterItems, deleteFilterItem } = useFilterItemsService()
    const { toggleForm, onEditFilter } = useFilterItemForm()
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="toggleForm"
            >
                Добавить
            </v-button>
        </template>
        <template #title>
            Фильтры
        </template>
        <template #body>
            <items-list
                :items="filterItems"
                @delete="deleteFilterItem"
                @edit="onEditFilter"
            >
                <template #title="{item}">
                    <span>{{ item.value }}</span>
                </template>
            </items-list>
        </template>
    </form-card>
</template>
