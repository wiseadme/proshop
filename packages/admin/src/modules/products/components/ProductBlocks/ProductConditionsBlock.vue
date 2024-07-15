<script lang="ts" setup>
    import { inject } from 'vue'

    import { useProductModel } from '@modules/products/composables/use-product-model'

    import { useButtonsPanel } from '@shared/composables/use-buttons-panel'

    import { FormCard } from '@shared/components/FormCard'
    import VSvg from '@shared/components/VSvg/VSvg.vue'

    import { ProductConditions } from '@modules/products/enums/product-conditions'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useProductModel()

    const form = inject('$v_form', {}) as any

    useButtonsPanel({
        title: 'Управление состоянием',
        onOk: () => form.validate(),
        onDismiss: () => {
        }
    })

</script>
<template>
    <v-row class="app-border-radius">
        <v-col
            offset-xl="2"
            offset-lg="2"
            xl="8"
            lg="8"
            md="12"
            sm="12"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.CAMERA"/>
                </template>
                <template #body>
                    <div class="d-flex flex-column">
                        <v-checkbox
                            v-model="model.conditions.isCountable"
                            :label="ProductConditions.IS_COUNTABLE"
                        />
                        <v-checkbox
                            v-model="model.conditions.isExists"
                            :label="ProductConditions.IS_EXISTS"
                        />
                        <v-checkbox
                            v-model="model.conditions.isVisible"
                            :label="ProductConditions.IS_VISIBLE"
                        />
                    </div>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
