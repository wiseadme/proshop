<script lang="ts" setup>
    import FormCard from '@shared/components/FormCard/FormCard.vue'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import VKNetwork from '@modules/networks/components/VKNetwork.vue'
    import FacebookNetwork from '@modules/networks/components/FacebookNetwork.vue'
    import { SvgPaths } from '@shared/enums/svg-paths'
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg
                width="38"
                view-box="-8 -91 650 650"
                :path="SvgPaths.NETWORKS"
            />
        </template>
        <template #title>
            Социальные сети для продвижения товаров
        </template>
        <template #body>
            <div class="d-flex">
                <v-k-network/>
                <facebook-network/>
            </div>
        </template>
    </form-card>
</template>
