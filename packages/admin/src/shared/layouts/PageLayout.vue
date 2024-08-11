<script lang="ts" setup>
    import { computed } from 'vue'

    import { useRoute } from 'vue-router'

    const route = useRoute()

    const isEditMode = computed(() => Boolean(route.params.action))
</script>
<template>
    <v-main class="page-layout d-flex justify-space-between">
        <div :class="{['page-layout-content']: true, ['page-layout-content--with-sidebar']: isEditMode}">
            <router-view/>
        </div>
        <div
            v-if="isEditMode"
            class="page-layout-right-sidebar"
        >
            <router-view name="right"/>
        </div>
    </v-main>
</template>
<style lang="scss" scoped>
    $gap: 10px;

    .page-layout {
        position: relative;

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
