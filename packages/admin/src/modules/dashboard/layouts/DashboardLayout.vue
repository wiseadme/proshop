<script lang="ts" setup>
</script>
<template>
    <div
        class="dashboard-layout"
        style="position: relative"
    >
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
</template>
