<script lang="ts" setup>
    import { getProductConditionTitle } from '@modules/products/helpers'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { FormCard } from '@shared/components/FormCard'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useProductModel()

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
                            v-model="model.conditions.countable"
                            :label="getProductConditionTitle('countable')"
                        />
                        <v-checkbox
                            v-model="model.conditions.exists"
                            :label="getProductConditionTitle('exists')"
                        />
                        <v-checkbox
                            v-model="model.conditions.visible"
                            :label="getProductConditionTitle('visible')"
                        />
                    </div>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
