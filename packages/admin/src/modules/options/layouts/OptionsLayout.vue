<script lang="ts" setup>

</script>
<template>
    <div class="options-layout">
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
