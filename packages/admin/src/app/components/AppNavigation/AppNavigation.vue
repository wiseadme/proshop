<script lang="ts" setup>
  import {
    ref,
    unref,
    watch
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const items = {
    dashboard: {
      title: 'Показатели',
      icon: 'fas fa-chart-pie',
      path:'/dashboard'
    },
    categories: {
      title: 'Категории',
      icon: 'fas fa-cubes',
      path: '/categories'
    },
    products: {
      title: 'Товары',
      icon: 'fas fa-boxes',
      path: '/products'
    },
    orders: {
      title: 'Заказы',
      icon: 'fas fa-folder',
      path: '/orders'
    },
    customers: {
      title: 'Клиенты',
      icon:'fas fa-people-arrows',
      path: '/customers'
    },
    users: {
      title: 'Сотрудники',
      icon: 'fas fa-user',
      path: '/users'
    },
    attributes: {
      title: 'Атрибуты',
      icon: 'fab fa-buffer',
      path: '/attributes'
    },
    units: {
      title: 'Измерения',
      icon: 'fab fa-unity',
      path: '/units'
    },
    variants: {
      title: 'Варианты',
      icon: 'far fa-object-ungroup',
      path: '/variants'
    },
    metatags: {
      title: 'Мета теги',
      icon: 'fas fa-code',
      path: '/metatags'
    },
    settings: {
      title: 'Конфигурация',
      icon: 'fas fa-cog',
      parent: 'settings',
      children: {
        merchant: {
          title: 'Организация',
          icon: 'fas fa-store-alt',
          path: '/settings/merchant',
        },
      }
    }
  // {
  //   title: 'Элементы',
  //   icon: 'fas fa-newspaper',
  //   path: '/elements'
  // }
  }

  const current = ref<Maybe<any>>(null)

  const onSelect = (it) => {
    router.push(it.path)
  }

  const getCurrentItemIndexByRoutePath = (items, path) => {
    const key = Object.keys(items).find((key) => path.includes(key))

    return items[key!]
  }

  watch(() => route.path, (newPath) => {
    if (newPath === '/') return

    current.value = getCurrentItemIndexByRoutePath(items, newPath)

    if (unref(current)?.children) {
      const parent = newPath.split('/').filter(it => !!it)[0]

      current.value = getCurrentItemIndexByRoutePath(items[parent].children, newPath)
    }


  }, {immediate: true})

</script>
<template>
  <v-navigation
    class="elevation-2"
    expand
    on-hover
    color="cyan darken-3"
  >
    <v-list color="cyan darken-3">
      <v-list-item class="mb-2"/>
      <template
        v-for="it in items"
        :key="it.title"
      >
        <v-list-item
          v-if="!it.children"
          class="navigation-item pl-1 white--text"
          :class="{'navigation-item--active': current && (it.path === current.path)}"
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
          class="navigation-item__group white--text"
          :expand="current && Object.keys(it.children).some(key => current.path === it.children[key].path)"
        >
          <v-list color="cyan darken-3">
            <v-list-item
              v-for="c in it.children"
              :key="c.title"
              class="navigation-item"
              :class="{'navigation-item--active': current && (c.path === current.path)}"
              @click="onSelect(c)"
            >
              <v-list-item-icon class="ml-1">
                <v-icon
                  size="12"
                  color="grey lighten-2"
                >
                  {{ c.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ c.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-group>
      </template>
    </v-list>
  </v-navigation>
</template>
<style lang="scss">
  @import 'AppNavigation';
</style>
