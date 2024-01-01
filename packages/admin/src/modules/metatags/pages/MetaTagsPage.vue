<script lang="ts" setup>
    import { MetaTagsList } from '@modules/metatags/components/MetaTagsList'
    import { MetaTagFormModal } from '@modules/metatags/components/modals'

</script>
<template>
    <div class="meta-tags-page">
        <v-layout>
            <v-row>
                <v-col
                    xl="8"
                    lg="8"
                    offset-xl="2"
                    offset-lg="2"
                >
                    <meta-tags-list/>
                </v-col>
            </v-row>
        </v-layout>
        <meta-tag-form-modal/>
    </div>
</template>
<style lang="scss">
</style>
