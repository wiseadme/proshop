<script lang="ts">
    import { defineComponent } from 'vue'
    // @ts-ignore
    // eslint-disable-next-line import/no-unresolved
    import CardsPage from 'shop/cards'

    export default defineComponent({
        components: { CardsPage },
        setup(){
            return {}
        }
    })
</script>
<template>
    <cards-page :is-active="true"/>
</template>
