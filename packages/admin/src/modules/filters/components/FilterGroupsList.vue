<script lang="ts" setup>
    import { ref } from 'vue'

    import { useFilterGroups } from '@modules/filters/composables/view/use-filter-groups'

    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'


    import { IFilterGroup } from '@proshop-app/types'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const {
        filterGroups,
        showGroupForm,
        onDeleteGroup,
        onEditGroup
    } = useFilterGroups()

    const currentEditable = ref(null)

</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #title>
            Группы фильтров
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="showGroupForm = true"
            >
                Добавить
            </v-button>
        </template>
        <template #body>
            <items-list
                v-model="currentEditable"
                :items="filterGroups"
                @delete="onDeleteGroup"
                @edit="onEditGroup"
            >
                <template #title="{item}">
                    <span>{{ (item as IFilterGroup).name }}</span>
                </template>
            </items-list>
        </template>
    </form-card>
</template>
