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
    import { RouteNames as ProductsRouteNames } from '@modules/products/enums/route-names.ts'
    import { RouteNames as OrdersRouteNames } from '@modules/orders/enums/route-names.ts'
    import { RouteNames as CustomersRouteNames } from '@modules/customers/enums/route-names.ts'
    import { RouteNames as UsersRouteNames } from '@modules/users/enums/route-names.ts'
    import { RouteNames as AttributesRouteNames } from '@modules/attributes/enums/route-names'
    import { RouteNames as FiltersRouteNames } from '@modules/filters/enums/route-names.ts'
    import { RouteNames as UnitsRouteNames } from '@modules/units/enums/route-names.ts'
    import { RouteNames as VariantsRouteNames } from '@modules/variants/enums/route-names.ts'
    import { RouteNames as MetaTagsRouteNames } from '@modules/metatags/enums/route-names.ts'

    const router = useRouter()
    const route = useRoute()

    const items: Record<string, any> = markRaw({
        dashboard: {
            title: 'Показатели',
            icon: 'fas fa-chart-pie',
            name: 'dashboard',
        },
        [CategoriesRouteNames.CATEGORIES]: {
            title: 'Категории',
            icon: 'fas fa-cubes',
            name: CategoriesRouteNames.CATEGORIES
        },
        [ProductsRouteNames.PRODUCTS]: {
            title: 'Товары',
            icon: 'fas fa-boxes',
            name: ProductsRouteNames.PRODUCTS
        },
        [OrdersRouteNames.ORDERS]: {
            title: 'Заказы',
            icon: 'fas fa-folder',
            name: OrdersRouteNames.ORDERS,
        },
        [CustomersRouteNames.CUSTOMERS]: {
            title: 'Клиенты',
            icon: 'fas fa-people-arrows',
            name: CustomersRouteNames.CUSTOMERS,
        },
        [UsersRouteNames.USERS]: {
            title: 'Сотрудники',
            icon: 'fas fa-user',
            name: UsersRouteNames.USERS,
        },
        [AttributesRouteNames.ATTRIBUTES]: {
            title: 'Атрибуты',
            icon: 'fab fa-buffer',
            name: AttributesRouteNames.ATTRIBUTES,
        },
        [FiltersRouteNames.FILTER]: {
            title: 'Фильтры',
            icon: 'fas fa-list',
            children: {
                [FiltersRouteNames.FILTER_GROUPS]: {
                    title: 'Группы фильтров',
                    icon: 'far fa-object-group',
                    name: FiltersRouteNames.FILTER_GROUPS,
                    parent: 'filter',
                },
                [FiltersRouteNames.FILTER_ITEMS]: {
                    title: 'Коллекции фильтров',
                    icon: 'far fa-object-group',
                    name: FiltersRouteNames.FILTER_ITEMS,
                    parent: 'filter',
                },
            },
        },
        groups: {
            title: 'Группировка вариантов',
            icon: 'fas fa-object-group',
            path: '/groups',
        },
        [UnitsRouteNames.UNITS]: {
            title: 'Измерения',
            icon: 'fab fa-unity',
            name: UnitsRouteNames.UNITS,
        },
        [VariantsRouteNames.VARIANTS]: {
            title: 'Варианты',
            icon: 'far fa-object-ungroup',
            name: VariantsRouteNames.VARIANTS,
        },
        [MetaTagsRouteNames.META_TAGS]: {
            title: 'Мета теги',
            icon: 'fas fa-code',
            name: MetaTagsRouteNames.META_TAGS
        },
        networks: {
            title: 'Социальные сети',
            icon: 'fas fa-project-diagram',
            name: 'networks',
        },
        [SettingsRouteNames.SETTINGS]: {
            title: 'Конфигурация',
            icon: 'fas fa-cog',
            children: {
                [SettingsRouteNames.MERCHANT_SETTINGS]: {
                    title: 'Организация',
                    icon: 'fas fa-store-alt',
                    name: SettingsRouteNames.MERCHANT_SETTINGS,
                },
                [SettingsRouteNames.SITE_SETTINGS]: {
                    title: 'Сайт',
                    icon: 'fas fa-store-alt',
                    params: {
                        action: 'edit',
                        section: 'colors'
                    },
                    name: SettingsRouteNames.SITE_SETTINGS
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

    const onSelect = ({ path, name, params = {} }) => {
        router.push(name ? { name, params } : path)
    }

    watch(() => route.path, () => {
        if (!route.meta.name) return

        const name = route.meta.name as string
        current.value = items[name]

        if (unref(current)?.children) {
            current.value = items[name].children[route.name!] ?? items[name].children[route.name!]
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
                    :class="{'navigation-item--active elevation-2': current && (it.name === current.name)}"
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
                    :expand="current && Object.keys(it.children).some(key => current.name === it.children[key].name)"
                >
                    <v-list-item
                        v-for="child in it.children"
                        :key="child.title"
                        class="navigation-item app-border-radius mb-1"
                        :class="{'navigation-item--active elevation-2': current && (child.name === current.name)}"
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
