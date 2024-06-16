<script lang="ts" setup>
    import {
        onMounted,
        ref,
        unref,
        watch
    } from 'vue'
    import GroupsFormOptionBuilder from '@modules/groups/components/GroupsForm/GroupsFormOptionBuilder.vue'
    import { ModalCard } from '@shared/components/Modals'
    import { VSvg } from '@shared/components/VSvg'
    import { useGroups } from '@modules/groups/composables/use-groups'
    import { useGroupModel } from '@modules/groups/composables/use-group-model'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { IFilterGroup, IVariant } from '@proshop/types'

    defineEmits<{
        (e: 'close'): void
    }>()

    const {
        model: groupModel,
    } = useGroupModel()

    const {
        variants,
        filterItems,
        filterGroups,
        onCreateGroup,
        getVariantItems,
        getOptionFilterItems,
        getOptionFilterGroups,
    } = useGroups()

    const selectedFilterGroup = ref<Maybe<IFilterGroup>>(null)


    const onCreateOptionItem = (option) => {
        console.log(option)
    }

    watch(() => unref(groupModel).variant, (value: IVariant) => {
        getOptionFilterGroups({ attributeId: value.attributeId })
        selectedFilterGroup.value = null
    })

    watch(selectedFilterGroup, (value: IFilterGroup) => {
        if (value) {
            getOptionFilterItems({ groupId: value.id })
        }
    })

    onMounted(() => {
        getVariantItems()
    })

</script>
<template>
    <v-form v-slot="{validate}">
        <modal-card
            :width="800"
            @close="$emit('close')"
        >
            <template #icon>
                <v-svg :path="SvgPaths.LIST"/>
            </template>
            <template #title>
                Группы вариантов
            </template>
            <template #content>
                <v-row>
                    <v-col cols="6">
                        <v-select
                            v-model="groupModel.variant"
                            label="Вариант *"
                            :items="variants"
                            value-key="name"
                            :rules="[() => groupModel.variant || 'Выберите вариант объединения в группу']"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            v-model="groupModel.name"
                            label="Название группы *"
                            :rules="[(val) => val.length || 'Заполните название группы']"
                        />
                    </v-col>
                </v-row>
                <v-row v-if="groupModel.id">
                    <v-col>
                        <v-select
                            v-model="selectedFilterGroup"
                            label="Группа фильтров *"
                            :items="filterGroups"
                            value-key="name"
                            :rules="[() => selectedFilterGroup || 'Выберите группу фильтров']"
                        />
                    </v-col>
                </v-row>
                <groups-form-option-builder
                    v-if="groupModel.id"
                    :filters="filterItems"
                    @create-option="onCreateOptionItem"
                />
            </template>
            <template #actions>
                <v-row>
                    <v-col>
                        <v-button
                            color="success"
                            label="Создать"
                            width="120"
                            elevation="2"
                            class="app-border-radius"
                            @click="onCreateGroup(validate)"
                        />
                    </v-col>
                </v-row>
            </template>
        </modal-card>
    </v-form>
</template>
