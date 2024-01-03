<script lang="ts" setup>
    import {
        markRaw,
        ref,
        unref,
        watch,
    } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { RouteNames as SettingsRouteNames } from '@modules/settings/enums/route-names'
    import { RouteNames as CategoriesRouteNames } from '@modules/categories/enums/route-names'

    const router = useRouter()
    const route = useRoute()

    const items = markRaw({
        dashboard: {
            title: 'Показатели',
            icon: 'fas fa-chart-pie',
            path: '/dashboard',
        },
        [CategoriesRouteNames.CATEGORIES]: {
            title: 'Категории',
            icon: 'fas fa-cubes',
            path: '/categories',
        },
        products: {
            title: 'Товары',
            icon: 'fas fa-boxes',
            path: '/products',
        },
        orders: {
            title: 'Заказы',
            icon: 'fas fa-folder',
            path: '/orders',
        },
        customers: {
            title: 'Клиенты',
            icon: 'fas fa-people-arrows',
            path: '/customers',
        },
        users: {
            title: 'Сотрудники',
            icon: 'fas fa-user',
            path: '/users',
        },
        attributes: {
            title: 'Атрибуты',
            icon: 'fab fa-buffer',
            path: '/attributes',
        },
        filter: {
            title: 'Фильтры',
            icon: 'fas fa-list',
            children: {
                ['/filter/groups']: {
                    title: 'Группы фильтров',
                    icon: 'far fa-object-group',
                    path: '/filter/groups',
                    parent: 'filter',
                },
                ['/filter/items']: {
                    title: 'Коллекции фильтров',
                    icon: 'far fa-object-group',
                    path: '/filter/items',
                    parent: 'filter',
                },
            },
        },
        units: {
            title: 'Измерения',
            icon: 'fab fa-unity',
            path: '/units',
        },
        variants: {
            title: 'Варианты',
            icon: 'far fa-object-ungroup',
            path: '/variants',
        },
        metatags: {
            title: 'Мета теги',
            icon: 'fas fa-code',
            path: '/metatags',
        },
        networks: {
            title: 'Социальные сети',
            icon: 'fas fa-project-diagram',
            path: '/networks',
        },
        [SettingsRouteNames.SETTINGS]: {
            title: 'Конфигурация',
            icon: 'fas fa-cog',
            children: {
                [SettingsRouteNames.MERCHANT_SETTINGS]: {
                    title: 'Организация',
                    icon: 'fas fa-store-alt',
                    path: '/settings/merchant',
                },
                [SettingsRouteNames.SITE_EDIT_PAGE]: {
                    title: 'Сайт',
                    icon: 'fas fa-store-alt',
                    path: '/settings/site/edit/colors',
                },
            },
        },
        // elements: {
        //     title: 'Элементы',
        //     icon: 'fas fa-newspaper',
        //     path: '/elements'
        // }
    })

    const current = ref<Maybe<any>>(null)

    const onSelect = (it) => {
        router.push(it.path)
    }

    watch(() => route.path, () => {
        if (!route.meta.name) return

        const name = route.meta.name as string
        current.value = items[name]

        if (unref(current)?.children) {
            current.value = items[name].children[route.path] ?? items[name].children[route.name]
        }

    }, { immediate: true })

</script>
<template>
    <v-navigation
        class="elevation-2"
        expand
        on-hover
        fixed
    >
        <v-list color="white px-2 py-1">
            <v-list-item class="mb-2 pt-15"/>
            <template
                v-for="it in items"
                :key="it.title"
            >
                <v-list-item
                    v-if="!it.children"
                    class="navigation-item pl-1 app-border-radius mb-1"
                    :class="{'navigation-item--active elevation-2': current && (it.path === current.path)}"
                    @click="onSelect(it)"
                >
                    <v-list-item-icon>
                        <v-icon>{{ it.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ it.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-group
                    v-else
                    :prepend-icon="it.icon"
                    :title="it.title"
                    class="navigation-item__group app-border-radius mb-1"
                    :expand="current && Object.keys(it.children).some(key => current.path === it.children[key].path)"
                >
                    <v-list-item
                        v-for="child in it.children"
                        :key="child.title"
                        class="navigation-item app-border-radius mb-1"
                        :class="{'navigation-item--active elevation-2': current && (child.path === current.path)}"
                        @click="onSelect(child)"
                    >
                        <v-list-item-icon class="ml-1">
                            <v-icon
                                size="12"
                                color="grey lighten-2"
                            >
                                {{ child.icon }}
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ child.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-group>
            </template>
        </v-list>
    </v-navigation>
</template>
<style lang="scss">
    @import 'AppNavigation';
</style>
