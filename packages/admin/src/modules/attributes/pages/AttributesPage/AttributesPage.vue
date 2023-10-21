<script lang="ts" setup>
    import { AttributeFormModal } from '@modules/attributes/components/AttributeFormModal'
    import { AttributesList } from '@modules/attributes/components/AttributesList'

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col
                xl="8"
                lg="8"
                md="8"
                offset-xl="2"
                offset-lg="2"
                offset-md="2"
            >
                <attributes-list/>
            </v-col>
        </v-row>
        <attribute-form-modal/>
    </v-layout>
</template>
<style lang="scss">
    @import "AttributePage";
</style>
