<script lang="ts" setup>
    import { useRightSidebar } from '@shared/composables/use-right-sidebar'

    const { activeItem } = useRightSidebar()

    const onEdit = () => {}

</script>
<template>
    <v-layout column>
        <component
            :is="activeItem.component"
            v-if="activeItem"
            @edit="onEdit"
        ></component>
    </v-layout>
</template>
