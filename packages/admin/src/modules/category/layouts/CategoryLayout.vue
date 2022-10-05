<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'category-layout',
    setup() {
      return {}
    }
  })
</script>
<template>
  <div
    class="category-layout"
    style="position: relative"
  >
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

