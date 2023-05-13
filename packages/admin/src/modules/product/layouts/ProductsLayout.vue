<script lang="ts" setup>

</script>
<template>
    <v-main style="position: relative">
        <router-view v-slot="{ Component }">
            <transition
                name="fade"
                mode="out-in"
            >
                <component :is="Component"/>
            </transition>
        </router-view>
    </v-main>
</template>

