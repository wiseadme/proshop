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
    class="elevation-3"
  >
    <v-toolbar-nav-btn/>
    <v-toolbar-logo>
      <svg
        class="logo"
        viewBox="0 0 128 128"
        width="38"
        height="38"
      >
        <path
          fill="#42b883"
          d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
        ></path>
        <path
          fill="#35495e"
          d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
        ></path>
      </svg>
    </v-toolbar-logo>
    <v-spacer/>
  </v-toolbar>
</template>
<style lang="scss">
  @import 'AppHeader';
</style>
