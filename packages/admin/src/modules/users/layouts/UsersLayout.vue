<script setup lang="ts">
</script>
<template>
    <div
        class="users-layout"
        style="position: relative"
    >
        <router-view v-slot="{ Component }">
            <transition
                name="fade"
                mode="out-in"
            >
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
</template>

