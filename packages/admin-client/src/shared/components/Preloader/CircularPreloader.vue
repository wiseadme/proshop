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
  <v-layout
    class="d-flex justify-center align-center"
    style="height: calc(100vh - 66px); width: 100%"
    column
  >
    <h1>Loading...</h1>
  </v-layout>
</template>
