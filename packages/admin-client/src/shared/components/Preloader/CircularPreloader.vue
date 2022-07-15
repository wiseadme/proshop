<script lang="ts">
  import { defineComponent, shallowRef, computed, onBeforeMount } from 'vue'
  import { useAppStore } from '@app/store'

  export default defineComponent({
    name: 'circular-preloader',
    setup() {
      const percentage = shallowRef(0)
      const store = useAppStore()
      let timer: any = null

      const percentProgress = () => {
        if (!store.progress && percentage.value < 99) {
          timer = setTimeout(() => {
            percentage.value += 1
            percentProgress()
          }, 150)
        } else {
          clearTimeout(timer)
        }
      }

      const computedColor = computed<string>(() => {
        if (!store.progress) {
          if (percentage.value < 33) return 'red darken-1'
          if (percentage.value >= 33 && percentage.value < 66) return 'orange darken-1'
        }
        return 'green'
      })

      onBeforeMount(() => {
        store.progress = 0
        percentProgress()
      })

      return {
        percentage,
        computedColor,
        store
      }
    }
  })
</script>
<template>
  <v-layout
    class="d-flex justify-center align-center"
    style="height: calc(100vh - 66px); width: 100%"
    column
  >
    <v-progress-circular
      :color="computedColor"
      size="100"
      width="10"
      rotate="270"
      :value="store.progress || percentage"
    >
      <h3>{{ store.progress || percentage }}</h3>
    </v-progress-circular>
  </v-layout>
</template>
