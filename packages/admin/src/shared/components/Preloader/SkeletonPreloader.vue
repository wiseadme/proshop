<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'circular-preloader',
    setup(){

      return {

      }
    }
  })
</script>
<template>
  <div
    style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 2"
    class="px-2"
  >
    <v-skeleton
      height="30"
      dynamic
      class="elevation-2"
    />
    <v-skeleton
      height="30"
      dynamic
      class="mt-2 elevation-2"
    />
    <v-skeleton
      height="30"
      dynamic
      class="mt-2 elevation-2"
    />
    <v-skeleton
      height="30"
      dynamic
      class="mt-2 elevation-2"
    />
    <v-skeleton
      height="30"
      dynamic
      class="mt-2 elevation-2"
    />
    <v-skeleton
      height="30"
      dynamic
      class="mt-2 elevation-2"
    />
    <v-skeleton
      height="30"
      dynamic
      class="mt-2 elevation-2"
    />
  </div>
</template>
