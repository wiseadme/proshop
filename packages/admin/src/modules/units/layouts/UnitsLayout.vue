<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'units-layout',
        setup(){
            return {}
        }
    })
</script>
<template>
    <div class="units-layout">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
</template>
