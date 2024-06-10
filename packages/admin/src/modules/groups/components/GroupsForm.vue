<script lang="ts" setup>
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { useGroupsDeps } from '@modules/groups/composables/use-groups-deps'
    import { useGroupModel } from '@modules/groups/composables/use-group-model'

    const { model } = useGroupModel()

    const {
        products,
        variants,
        onSearchProducts
    } = useGroupsDeps()

</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #title>
            Группы вариантов
        </template>
        <template #body>
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
    </form-card>
</template>
