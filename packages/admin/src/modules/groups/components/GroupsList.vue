<script lang="ts" setup>
    import { onBeforeMount } from 'vue'
    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useGroupsList } from '@modules/groups/composables/view/groups/use-groups-list'
    import {
        useGroupsFormModal
    } from '@modules/groups/composables/view/groups/use-groups-form-modal'
    import { useGroupModel } from '@modules/groups/composables/view/groups/use-group-model'

    const {
        groups,
        getGroups,
        onEditGroup,
        onDeleteGroup
    } = useGroupsList()

    const { isGroupModalVisible } = useGroupsFormModal()
    const { clearModel } = useGroupModel()

    const onOpenModal = () => {
        clearModel()
        isGroupModalVisible.value = true
    }

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
                @click="onOpenModal"
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
                    <span>{{ item?.name }}</span>
                </template>
            </items-list>
        </template>
    </form-card>
</template>
