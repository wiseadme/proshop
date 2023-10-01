<script lang="ts" setup>
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'
    import { unref } from 'vue'
    import { useRoute } from 'vue-router'

    const { tabs } = defineProps<{
        tabs: any[]
    }>()

    const emit = defineEmits<{
        (e: 'select-tab', val: any): void
    }>()

    const { activeItem, setActiveNavItem } = useRightSidebar()
    const route = useRoute()

    const ind = unref(tabs).findIndex(tab => route.params.section === tab.section) || 0

    const onClick = (tab) => {
        if (tab.disabled) return

        setActiveNavItem(tab)
        emit('select-tab', tab)
    }

    setActiveNavItem(unref(tabs)[ind || 0])
</script>
<template>
    <div
        class="sidebar sidebar--sticky grey lighten-2 white--text app-border-radius d-flex flex-column elevation-5 pt-2"
    >
        <v-card
            color="secondary"
            style="width: auto; font-size: .8rem"
            class="pa-2 pb-3 mx-2 app-border-radius"
            elevation="2"
        >
            <slot name="header"/>
        </v-card>
        <v-list
            class="context-menu mt-2 pa-2 app-border-radius"
            color="secondary"
        >
            <v-list-item
                v-for="tab in tabs"
                :key="tab.title"
                class="context-menu__item app-border-radius mb-1 white--text"
                :class="{
                    success: activeItem.title === tab.title,
                    ['context-menu__item--disabled']: tab.disabled,
                    ['grey--text text--lighten-1']: tab.disabled,
                }"
                @click="onClick(tab)"
            >
                <v-list-item-icon v-if="tab.disabled">
                    <v-icon>fas fa-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    {{ tab.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>
<style lang="scss" scoped>
    .sidebar {
        height: calc(100vh - #{$layout-padding-top} - #{$layout-padding-bottom});

        &--sticky {
            position: sticky;
            top: $layout-padding-top;
        }
    }

    .context-menu {
        height: 100%;

        &__item {
            cursor: pointer;
        }

        &__buttons {
            justify-self: flex-end;
        }
    }
</style>
