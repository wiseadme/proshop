<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'unit-layout',
    setup(){
      return {}
    }
  })
</script>
<template>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"/>
      </transition>
    </router-view>
  </v-main>
</template>
