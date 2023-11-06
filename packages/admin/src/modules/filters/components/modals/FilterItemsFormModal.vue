<script lang="ts" setup>
    import ModalCard from '@shared/components/Modals/ModalCard.vue'
    import {
        ref,
        unref,
        watch,
    } from 'vue'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterItemForm } from '@modules/filters/composables/use-filter-item-form'
    import { useFilterItemsService } from '@modules/filters/composables/use-filter-items-service'
    import { IFilterGroup } from '@proshop/types'

    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { getFilterItems } = useFilterItemsService()
    const { model, showForm, toggleForm, onSubmit } = useFilterItemForm()

    const selectedGroup = ref<Maybe<IFilterGroup>>(null)

    if (!unref(filterGroups).length) {
        getFilterGroupItems()
    }

    const onSelectGroup = (group: IFilterGroup) => {
        unref(model).groupId = group.id
        getFilterItems({ groupId: group.id })
    }

    watch(filterGroups, (groups) => {
        if (!groups.length) return

        selectedGroup.value = unref(filterGroups)[0]
        onSelectGroup(unref(selectedGroup)!)
    }, { immediate: true })

</script>
<template>
    <v-modal
        v-model="showForm"
        transition="scale-in"
        overlay
    >
        <v-form v-slot="{validate}">
            <modal-card>
                <template #title>
                    Форма создания фильтров
                </template>
                <template #header>
                    <v-button
                        round
                        color="grey lighten-1"
                        elevation="2"
                        @click="toggleForm"
                    >
                        <v-icon>fas fa-times</v-icon>
                    </v-button>
                </template>
                <template #content>
                    <v-select
                        v-model="selectedGroup"
                        label="Группа фильтров *"
                        :items="filterGroups"
                        value-key="name"
                        @select="onSelectGroup"
                    />
                    <v-text-field
                        v-model="model.value"
                        label="Значение фильтра *"
                    />
                </template>
                <template #actions>
                    <v-button
                        color="primary"
                        class="app-border-radius"
                        width="120"
                        elevation="2"
                        @click="onSubmit(validate)"
                    >
                        Создать
                    </v-button>
                </template>
            </modal-card>
        </v-form>
    </v-modal>
</template>
