<script lang="ts" setup>
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const isEditMode = computed(() => route.params.action === 'edit')
</script>
<template>
    <v-main
        style="position: relative"
        class="page-layout d-flex justify-space-between"
    >
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
