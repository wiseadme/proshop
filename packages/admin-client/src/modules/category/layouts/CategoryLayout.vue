<script lang="ts">
  import { defineComponent } from 'vue'
  import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'

  export default defineComponent({
    name: 'category-layout',
    components: {
      SkeletonPreloader
    },
    setup() {
      return {}
    }
  })
</script>
<template>
  <v-main style="position: relative">
    <router-view v-slot="{ Component }">
      <transition name="fade">
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

