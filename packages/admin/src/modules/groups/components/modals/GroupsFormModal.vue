<script lang="ts" setup>
    import { ModalCard } from '@shared/components/Modals'
    import { VSvg } from '@shared/components/VSvg'
    import { useGroupsDeps } from '@modules/groups/composables/use-groups-deps'
    import { useGroupModel } from '@modules/groups/composables/use-group-model'
    import { useGroupsFormModal } from '@modules/groups/composables/use-groups-form-modal'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { watch } from 'vue'

    const { model } = useGroupModel()
    const { showFormModal } = useGroupsFormModal()

    const {
        products,
        variants,
        onSearchProducts
    } = useGroupsDeps()

    watch(showFormModal, (value) => {
        if (value) {

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
            width="100%"
            @close="showFormModal = false"
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
                            v-model="model.variant"
                            label="Вариант"
                            :items="variants"
                            value-key="name"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete
                            label="Поиск товара"
                            typeable
                            :items="products"
                            value-key="name"
                            @input="onSearchProducts"
                        />
                    </v-col>
                </v-row>
            </template>
        </modal-card>
    </v-modal>
</template>
