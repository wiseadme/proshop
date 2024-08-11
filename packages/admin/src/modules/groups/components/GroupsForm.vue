<script lang="ts" setup>
    import {
        computed,
        defineAsyncComponent,
        ref,
        unref,
        watch
    } from 'vue'

    import { useGroupModel } from '@modules/groups/composables/view/use-group-model'
    import { useGroups } from '@modules/groups/composables/view/use-groups'
    import { useGroupsFormModal } from '@modules/groups/composables/view/use-groups-form-modal'
    import { useOptions } from '@modules/groups/composables/view/use-options'

    import { VSvg } from '@shared/components/VSvg'

    import type { IFilterGroup, IVariant } from '@proshop-app/types'

    import { SvgPaths } from '@shared/enums/svg-paths'


    const ModalCard = defineAsyncComponent({
        loader: () => import('@shared/components/Modals').then(({ ModalCard }) => ModalCard)
    })

    defineEmits<{
        (e: 'close'): void
    }>()

    const { model: groupModel, isEditMode } = useGroupModel()

    const {
        variants,
        onCreateGroup,
        getVariantItems,
    } = useGroups()

    const {
        getOptions,
        clearOptions,
    } = useOptions()

    const { isGroupModalVisible } = useGroupsFormModal()

    const selectedFilterGroup = ref<Maybe<IFilterGroup>>(null)

    const isVariantDisabled = computed(() => Boolean(unref(groupModel).id))

    const onCreate = (validate: () => Promise<boolean>) => {
        validate().then(() => onCreateGroup())
    }

    watch(() => (unref(groupModel).variant as IVariant)?.id, (value) => {
        if (!value) return

        selectedFilterGroup.value = null
    })

    watch(selectedFilterGroup, (value: IFilterGroup) => {
        if (!value) return

        getOptions({ groupId: value.id })
    })

    watch(isGroupModalVisible, (value) => {
        if (!value || unref(variants).length) return

        getVariantItems()
    })

    watch(isEditMode, (value) => {
        value && getOptions({ groupId: unref(groupModel).id })
        !value && clearOptions()
    })

</script>
<template>
    <v-form
        v-slot="{validate}"
        class="group-form"
    >
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
