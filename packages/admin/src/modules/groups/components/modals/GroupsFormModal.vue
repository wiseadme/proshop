<script lang="ts" setup>
    import {
        onMounted,
        ref,
        unref,
        watch
    } from 'vue'
    import { ModalCard } from '@shared/components/Modals'
    import { VSvg } from '@shared/components/VSvg'
    import { useGroupsDeps } from '@modules/groups/composables/use-groups-deps'
    import { useGroupModel } from '@modules/groups/composables/use-group-model'
    import { useGroupsFormModal } from '@modules/groups/composables/use-groups-form-modal'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { IFilterGroup, IVariant } from '@proshop/types'

    const {
        model: groupModel,
        optionModel: groupOptionModel
    } = useGroupModel()
    const { showFormModal } = useGroupsFormModal()

    const {
        products,
        variants,
        filterItems,
        filterGroups,
        getVariantItems,
        getOptionFilterItems,
        getOptionFilterGroups,
        onSearchProducts
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
    <v-modal
        v-model="showFormModal"
        width="800"
        overlay
        transition="scale-in"
    >
        <modal-card
            :width="800"
            @close="showFormModal = false"
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
                    <v-row>
                        <v-col>
                            <v-autocomplete
                                label="Поиск товара"
                                typeable
                                :items="products"
                                value-key="name"
                                @input="onSearchProducts"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select
                                v-model="groupOptionModel.value"
                                label="Значение опции *"
                                :items="filterItems"
                                value-key="value"
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </template>
        </modal-card>
    </v-modal>
</template>
