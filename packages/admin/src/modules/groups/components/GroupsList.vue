<script lang="ts" setup>
    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useGroupsList } from '@modules/groups/composables/use-groups-list'
    import { onBeforeMount } from 'vue'
    import { useGroupsFormModal } from '@modules/groups/composables/use-groups-form-modal'

    const {
        groups,
        getGroups,
        onEditGroup,
        onDeleteGroup
    } = useGroupsList()

    const { showFormModal } = useGroupsFormModal()

    onBeforeMount(getGroups)
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #title>
            Группы вариантов товара
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="showFormModal = true"
            >
                Добавить
            </v-button>
        </template>
        <template #body>
            <items-list
                :items="groups"
                @delete="onDeleteGroup"
                @edit="onEditGroup"
            >
                <template #title="{item}">
                    <span>{{ item?.value }}</span>
                </template>
            </items-list>
        </template>
    </form-card>
</template>
