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
    import { useGroupsDeps } from '@modules/groups/composables/use-groups-deps'
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
        getVariantItems,
        getOptionFilterItems,
        getOptionFilterGroups,
    } = useGroupsDeps()

    const selectedFilterGroup = ref<Maybe<IFilterGroup>>(null)

    onMounted(() => {
        getVariantItems()
    })

    watch(() => unref(groupModel).variant, (value: IVariant) => {
        getOptionFilterGroups({ attributeId: value.attributeId })
        selectedFilterGroup.value = null
    })

    watch(selectedFilterGroup, (value: IFilterGroup) => {
        if (value) {
            getOptionFilterItems({ groupId: value.id })
        }
    })


</script>
<template>
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
            <v-form>
                <v-row>
                    <v-col cols="6">
                        <v-select
                            v-model="groupModel.variant"
                            label="Вариант *"
                            :items="variants"
                            value-key="name"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            v-model="selectedFilterGroup"
                            :items="filterGroups"
                            value-key="name"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="groupModel.name"
                            label="Название группы *"
                            :rules="[(val) => val.length || 'Обязательное поле']"
                        />
                    </v-col>
                </v-row>
                <groups-form-option-builder :filters="filterItems"/>
            </v-form>
        </template>
    </modal-card>
</template>
