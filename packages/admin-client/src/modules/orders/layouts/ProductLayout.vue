<script lang="ts">
  import { defineComponent } from 'vue'
  import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'

  export default defineComponent({
    name: 'product-layout',
    components: {
      SkeletonPreloader
    },
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
            <component :is="Component"/>
          </template>
          <template #fallback>
            <skeleton-preloader/>
          </template>
        </Suspense>
      </transition>
    </router-view>
  </v-main>
</template>

