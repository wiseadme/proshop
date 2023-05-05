<script lang="ts">
</script>
<template>
  <div class="config-layout">
    <router-view v-slot="{ Component }">
      <!--      <transition-->
      <!--        name="fade"-->
      <!--        mode="out-in"-->
      <!--      >-->
      <component :is="Component"/>
      <!--      </transition>-->
    </router-view>
  </div>
</template>
