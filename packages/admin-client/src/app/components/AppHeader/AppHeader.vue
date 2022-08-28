<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <v-toolbar
    fixed
    color="#272727"
    class="elevation-3"
  >
    <v-toolbar-content>
    </v-toolbar-content>
  </v-toolbar>
</template>
<style lang="scss">
@import 'AppHeader';
</style>
