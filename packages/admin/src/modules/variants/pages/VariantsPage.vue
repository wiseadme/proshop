<script lang="ts" setup>
    import { VariantsList } from '@modules/variants/components/VariantsList'
    import { VariantFormModal } from '@modules/variants/components/modals'
</script>
<template>
    <div class="variants-page">
        <v-row>
            <v-col
                xl="8"
                lg="8"
                offset-xl="2"
                offset-lg="2"
            >
                <variants-list/>
            </v-col>
        </v-row>
        <variant-form-modal/>
    </div>
</template>
<style lang="scss">
    .variant-item {
        min-height: 50px;
    }
</style>
