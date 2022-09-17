<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup(){
      const $router = useRouter()

      const items = [
        {
          title: 'Категории',
          icon: 'fas fa-cubes',
          path: '/categories'
        },
        {
          title: 'Товары',
          icon: 'fas fa-boxes',
          path: '/products'
        },
        {
          title: 'Заказы',
          icon: 'fas fa-folder',
          path: '/orders'
        },
        {
          title: 'Атрибуты',
          icon: 'fab fa-buffer',
          path: '/attributes'
        },
        {
          title: 'Измерения',
          icon: 'fab fa-unity',
          path: '/units'
        },
        {
          title: 'Варианты',
          icon: 'far fa-object-ungroup',
          path: '/variants'
        },
        {
          title: 'Элементы',
          icon: 'fas fa-newspaper',
          path: '/elements'
        }
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
      active-class="green white--text text--base"
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
