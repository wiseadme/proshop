<script lang="ts" setup>
    import UnitsList from '@modules/units/components/UnitsList.vue'
    import UnitsFormModal from '@modules/units/components/UnitsFormModal.vue'
</script>
<template>
    <v-layout column>
        <v-row>
            <v-col
                xl="8"
                lg="8"
                md="12"
                sm="12"
                offset-xl="2"
                offset-lg="2"
            >
                <units-list />
            </v-col>
        </v-row>
        <units-form-modal/>
    </v-layout>
</template>
<style lang="scss">
    .units {
        &__item {
            height: 50px;
        }
    }
</style>
