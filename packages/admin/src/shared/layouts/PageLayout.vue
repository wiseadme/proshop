<script lang="ts" setup>
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const isActionsMode = computed(() => route.params.action === 'edit' || route.params.action === 'create')
</script>
<template>
    <v-main
        style="position: relative"
        class="page-layout d-flex justify-space-between"
    >
        <div :class="{['page-layout-content']: true, ['page-layout-content--with-sidebar']: isActionsMode}">
            <router-view/>
        </div>
        <div
            v-if="isActionsMode"
            class="page-layout-right-sidebar"
        >
            <router-view name="right"/>
        </div>
    </v-main>
</template>
<style lang="scss" scoped>
    $gap: 10px;

    .page-layout {
        &-content {
            width: 100%;

            &--with-sidebar {
                width: calc(100% - #{$navigation-width} - #{$gap});
            }
        }

        &-right-sidebar {
            width: $navigation-width;
        }
    }
</style>
