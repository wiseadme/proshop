<script setup lang="ts">
</script>
<template>
  <div class="attribute-layout">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>
