<script lang="ts" setup>
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
    const { createFilterItem, getFilterItems } = useFilterItemsService()
    const { model } = useFilterItemForm()

    const selectedGroup = ref<Maybe<IFilterGroup>>(null)

    if (!unref(filterGroups).length) {
        getFilterGroupItems()
    }

    const createFilter = (validate) => {
        validate().then(() => createFilterItem(unref(model)))
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
    <v-form v-slot="{validate}">
        <v-card
            elevation="2"
            color="white"
            class="app-border-radius"
            style="width: 100%"
        >
            <v-card-title>
                <h3 class="primary--text">
                    Форма создания фильтра
                </h3>
            </v-card-title>
            <v-card-content>
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
            </v-card-content>
            <v-card-actions>
                <v-button
                    color="primary"
                    class="app-border-radius"
                    width="120"
                    elevation="2"
                    @click="createFilter(validate)"
                >
                    Создать
                </v-button>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
