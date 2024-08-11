<script lang="ts" setup>
    import { UnitsFormModal } from '@modules/units/components/modals'
    import UnitsList from '@modules/units/components/UnitsList.vue'
</script>
<template>
    <div class="units-page">
        <v-row>
            <v-col
                xl="8"
                lg="8"
                offset-xl="2"
                offset-lg="2"
            >
                <units-list />
            </v-col>
        </v-row>
        <units-form-modal/>
    </div>
</template>
<style lang="scss">
    .units {
        &__item {
            height: 50px;
        }
    }
</style>
