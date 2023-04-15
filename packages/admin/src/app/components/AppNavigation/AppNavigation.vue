<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    watch
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default defineComponent({
    setup(){
      const $router = useRouter()
      const $route = useRoute()

      const items = [
        {
          title: 'Показатели',
          icon: 'fas fa-chart-pie',
          path: '/dashboard'
        },
        {
          title: 'Категории',
          icon: 'fas fa-cubes',
          path: '/category'
        },
        {
          title: 'Товары',
          icon: 'fas fa-boxes',
          path: '/product'
        },
        {
          title: 'Заказы',
          icon: 'fas fa-folder',
          path: '/order'
        },
        {
          title: 'Клиенты',
          icon: 'fas fa-people-arrows',
          path: '/customer'
        },
        {
          title: 'Сотрудники',
          icon: 'fas fa-user',
          path: '/user'
        },
        {
          title: 'Атрибуты',
          icon: 'fab fa-buffer',
          path: '/attribute'
        },
        {
          title: 'Измерения',
          icon: 'fab fa-unity',
          path: '/unit'
        },
        {
          title: 'Варианты',
          icon: 'far fa-object-ungroup',
          path: '/variant'
        },
        {
          title: 'Мета теги',
          icon: 'fas fa-code',
          path: '/metatag'
        },
        {
          title: 'Конфигурация',
          icon: 'fas fa-cog',
          path: '/config'
        },
        // {
        //   title: 'Элементы',
        //   icon: 'fas fa-newspaper',
        //   path: '/elements'
        // }
      ]

      const current = ref<Maybe<number>>(null)

      const onSelect = (it) => {
        $router.push(it.path)
      }

      onMounted(() => {
        current.value = items.findIndex(it => {
          return it.path === $router.currentRoute.value.path
        })
      })

      watch(() => $route.path, (newPath) => {
        current.value = items.findIndex(it => it.path === newPath)
      })

      return {
        current,
        items,
        onSelect
      }
    }
  })
</script>
<template>
  <v-navigation
    fixed
    :on-hover="true"
    offset-top="56"
    class="elevation-2"
  >
    <v-list
      v-model:value="current"
      active-class="primary white--text text--base"
      active
    >
      <v-list-item
        v-for="it in items"
        :key="it.title"
        class="pl-1"
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
    </v-list>
  </v-navigation>
</template>
<style lang="scss">
  @import 'AppNavigation';
</style>
