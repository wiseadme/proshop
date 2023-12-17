<script lang="ts" setup>
    import { AttributeFormModal } from '@modules/attributes/components/modals'
    import { AttributesList } from '@modules/attributes/components/AttributesList'

</script>
<template>
    <div class="attributes-page">
        <v-row>
            <v-col
                xl="8"
                lg="8"
                md="12"
                offset-xl="2"
                offset-lg="2"
            >
                <attributes-list/>
            </v-col>
        </v-row>
        <attribute-form-modal/>
    </div>
</template>
<style lang="scss">
    @import "AttributePage";
</style>
