<script lang="ts" setup>
    import { getProductConditionTitle } from '@modules/product/helpers'
    import { useProduct } from '@modules/product/composables/use-product'

    const { model } = useProduct()

</script>
<template>
    <v-row class="pa-4 white elevation-2 app-border-radius">
        <v-col
            xl="2"
            lg="4"
            md="6"
            sm="12"
        >
            <v-checkbox
                v-model="model.conditions.countable"
                :label="getProductConditionTitle('countable')"
            />
        </v-col>
        <v-col
            xl="2"
            lg="4"
            md="6"
            sm="12"
        >
            <v-checkbox
                v-model="model.conditions.exists"
                :label="getProductConditionTitle('exists')"
            />
        </v-col>
        <v-col
            xl="2"
            lg="4"
            md="6"
            sm="12"
        >
            <v-checkbox
                v-model="model.conditions.visible"
                :label="getProductConditionTitle('visible')"
            />
        </v-col>
    </v-row>
</template>
