<script lang="ts">
    import { defineComponent } from 'vue'
    import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'

    export default defineComponent({
        name: 'variant-layout',
        components: {
            SkeletonPreloader
        },
        setup(){
            return {}
        }
    })
</script>
<template>
    <v-main>
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component"/>
            </transition>
        </router-view>
    </v-main>
</template>

