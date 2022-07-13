<script lang="ts">
  import { defineComponent } from 'vue'
  import CircularPreloader from '@shared/components/Preloader/CircularPreloader.vue'

  export default defineComponent({
    name: 'variant-layout',
    components: {
      CircularPreloader
    },
    setup() {
      return {}
    }
  })
</script>
<template>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <Suspense>
          <template #default>
            <component :is="Component"/>
          </template>
          <template #fallback>
            <circular-preloader/>
          </template>
        </Suspense>
      </transition>
    </router-view>
  </v-main>
</template>

