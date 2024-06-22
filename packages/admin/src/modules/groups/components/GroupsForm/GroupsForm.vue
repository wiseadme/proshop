<script lang="ts" setup>
    import {
        computed,
        ref,
        unref,
        watch
    } from 'vue'
    import GroupsFormOptionBuilder from '@modules/groups/components/GroupsForm/GroupsFormOptionBuilder.vue'
    import { ModalCard } from '@shared/components/Modals'
    import { VSvg } from '@shared/components/VSvg'
    import { useGroups } from '@modules/groups/composables/view/groups/use-groups'
    import { useGroupModel } from '@modules/groups/composables/view/groups/use-group-model'
    import { useOptions } from '@modules/groups/composables/view/options/use-options'
    import { useGroupsFormModal } from '@modules/groups/composables/view/groups/use-groups-form-modal'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import type { IFilterGroup, IVariant } from '@proshop/types'

    defineEmits<{
        (e: 'close'): void
    }>()

    const { model: groupModel } = useGroupModel()

    const {
        variants,
        filterItems,
        filterGroups,
        onCreateGroup,
        getVariantItems,
        getOptionFilterItems,
        getOptionFilterGroups,
    } = useGroups()

    const {
        options,
        onCreateOption,
        getOptions
    } = useOptions()

    const { isGroupModalVisible } = useGroupsFormModal()

    const selectedFilterGroup = ref<Maybe<IFilterGroup>>(null)

    const isVariantDisabled = computed(() => Boolean(unref(groupModel).id))

    const onCreate = (validate: () => Promise<boolean>) => {
        validate().then(() => onCreateGroup())
    }

    watch(() => unref(groupModel).variant?.id, (value: IVariant) => {
        if (!value) return

        getOptionFilterGroups({ attributeId: value.attributeId })
        selectedFilterGroup.value = null
    })

    watch(selectedFilterGroup, (value: IFilterGroup) => {
        if (value) return

        getOptionFilterItems({ groupId: value.id })
    })

    watch(isGroupModalVisible, (value) => {
        if (!value) return

        getVariantItems()

        // isEditMode и вынести в отдельный вотчер
        if (unref(groupModel).id) {
            getOptions({ groupId: unref(groupModel).id })
        }

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
                            :disabled="isVariantDisabled"
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
                <div class="groups-option-filter">
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
                </div>
                <div class="groups-option-builder">
                    <groups-form-option-builder
                        v-if="groupModel.id && selectedFilterGroup"
                        :filters="filterItems"
                        @create-option="onCreateOption"
                    />
                </div>
                <div class="groups option-list mt-4">
                    <v-row>
                        <v-col>
                            <v-tooltip
                                v-for="option of options"
                                :key="option.id"
                                offset-y="-10"
                                color="white"
                                elevation="2"
                                top
                            >
                                <template #activator="{ on }">
                                    <v-chip
                                        color="success"
                                        :title="option.value"
                                        closable
                                        class="mr-2 elevation-2"
                                        style="max-height: 150px"
                                        v-on="on"
                                    />
                                </template>
                                <div class="option-description pa-2">
                                    <div class="option-image">
                                        <img
                                            :src="option.image"
                                            alt=""
                                            style="width: 100px; height: 100px"
                                        >
                                    </div>
                                    <span class="grey--text text--darken-3">{{ option.productName }}</span>
                                </div>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </div>
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
                            :disabled="isVariantDisabled"
                            @click="onCreate(validate)"
                        />
                    </v-col>
                </v-row>
            </template>
        </modal-card>
    </v-form>
</template>
<style lang="scss">
    .v-tooltip {
        max-height: 200px;
    }
</style>
