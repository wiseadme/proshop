<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'main-layout',
    setup() {
      return {}
    }
  })
</script>
<template>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <Suspense>
          <template #default>
            <component :is="Component" />
          </template>
        </Suspense>
      </transition>
    </router-view>
  </v-main>
</template>
<style lang="scss">
</style>
