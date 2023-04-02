<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'attributes-layout'
  })
</script>
<template>
  <div class="attribute-layout">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>
