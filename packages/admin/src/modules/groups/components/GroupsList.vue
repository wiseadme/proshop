<script lang="ts" setup>
    import { onBeforeMount } from 'vue'
    import { FormCard } from '@shared/components/FormCard'
    import { ItemsList } from '@shared/components/ItemsList'
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useGroupsList } from '@modules/groups/composables/view/use-groups-list'
    import { useGroupsFormModal } from '@modules/groups/composables/view/use-groups-form-modal'
    import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
    import { useOptionsFormModal } from '@modules/groups/composables/view/use-options-form-modal'

    const {
        groups,
        getGroups,
        onEditGroup,
        onDeleteGroup
    } = useGroupsList()

    const { isGroupModalVisible } = useGroupsFormModal()
    const { isOptionsModalVisible } = useOptionsFormModal()
    const { clearModel, setModel } = useGroupModel()

    const onOpenGroupModal = () => {
        clearModel()
        isGroupModalVisible.value = true
    }

    const onOpenOptionsModal = (group) => {
        setModel(group)
        isOptionsModalVisible.value = true
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
                @click="onOpenGroupModal"
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
                <template #custom="{item}">
                    <v-tooltip
                        top
                        color="grey darken-3"
                        offset-y="-10"
                    >
                        <template #activator="{ on }">
                            <v-button
                                class="app-border-radius ma-1"
                                width="30"
                                height="30"
                                elevation="2"
                                color="warning"
                                v-on="on"
                                @click="onOpenOptionsModal(item)"
                            >
                                <v-icon>fa-solid fa-table-list</v-icon>
                            </v-button>
                        </template>
                        <span>Редактировать опции</span>
                    </v-tooltip>
                </template>
            </items-list>
        </template>
    </form-card>
</template>
