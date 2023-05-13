<script lang="ts" setup>
</script>
<template>
    <div
        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 2"
        class="px-2"
    >
        <v-skeleton
            v-for="it in 20"
            :key="it"
            height="30"
            color="grey lighten-2"
            origin="center"
            class="mt-2"
        />
    </div>
</template>
