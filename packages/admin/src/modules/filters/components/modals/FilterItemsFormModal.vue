<script lang="ts" setup>
    import ModalCard from '@shared/components/Modals/ModalCard.vue'
    import { unref, watch } from 'vue'
    import { useFilterGroupService } from '@modules/filters/composables/use-filter-group-service'
    import { useFilterItems } from '@modules/filters/composables/use-filter-items'
    import { IFilterGroup } from '@proshop/types'
    import { useFilterItemModel } from '@modules/filters/composables/use-filter-item-model'

    const { filterGroups, getFilterGroupItems } = useFilterGroupService()
    const { filtersGroup, showForm, onCloseForm, onSubmit } = useFilterItems()
    const { model } = useFilterItemModel()

    if (!unref(filterGroups).length) {
        getFilterGroupItems()
    }

    const onSelectGroup = (group: IFilterGroup) => {
        unref(model).groupId = group.id
    }

    watch(filtersGroup, (group) => {
        if (!group) return

        onSelectGroup(group!)
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
                        @click="onCloseForm"
                    >
                        <v-icon>fas fa-times</v-icon>
                    </v-button>
                </template>
                <template #content>
                    <v-select
                        v-model="filtersGroup"
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
