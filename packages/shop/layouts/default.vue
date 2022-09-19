<template>
  <v-app>
    <app-header/>
    <app-navigation/>
    <v-main style="padding: 56px 0 0 256px;">
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {

    }
  })
</script>
