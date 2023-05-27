<script lang="ts" setup>
    import SiteColorsBlock from '@modules/settings/components/site/SiteColorsBlock.vue'
</script>
<template>
    <v-layout class="site-page">
        <v-row>
            <v-col>
                <SiteColorsBlock/>
            </v-col>
        </v-row>
    </v-layout>
</template>
<style lang="scss">
  @import "vue-color-kit/dist/vue-color-kit.css";
</style>
