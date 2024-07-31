<script lang="ts" setup>
    import { unref, watch } from 'vue'

    import { useFilterGroups } from '@modules/filters/composables/view/use-filter-groups'
    import { useFilterItemModel } from '@modules/filters/composables/view/use-filter-item-model'
    import { useFilterItems } from '@modules/filters/composables/view/use-filter-items'

    import ModalCard from '@shared/components/Modals/ModalCard.vue'

    import type { IFilterGroup } from '@proshop-app/types'

    const { filterGroups } = useFilterGroups()
    const { filtersGroup, showForm, onCloseForm, onSubmit } = useFilterItems()
    const { model } = useFilterItemModel()

    const onSelectGroup = (group: IFilterGroup) => {
        unref(model).groupId = group.id
    }

    watch(filtersGroup, (group) => {
        if (group) {
            onSelectGroup(group!)
        }
    }, { immediate: true })

</script>
<template>
    <v-modal
        v-model="showForm"
        transition="scale-in"
        overlay
    >
        <v-form v-slot="{validate}">
            <modal-card @close="onCloseForm">
                <template #title>
                    Форма создания фильтров
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
