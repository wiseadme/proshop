<script lang="ts" setup>
    import { onBeforeMount, unref } from 'vue'

    import { useRouter } from 'vue-router'

    import { useVK } from '@modules/networks/composables/use-vk'

    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const router = useRouter()
    const { getVKEnterURL, getAccessToken, clientCode } = useVK()

    const onClick = () => {
        console.log(/*color="#347aeb"*/)
        window.location.href = getVKEnterURL()
    }

    onBeforeMount(async () => {
        if (unref(clientCode)) {
            await getAccessToken()
            await router.push('/networks')
        }
    })

</script>
<template>
    <v-tooltip
        top
        elevation="5"
        color="rgba(0,0,0,.7)"
    >
        <template #activator="{on}">
            <div>
                <v-svg
                    :path="SvgPaths.VK"
                    width="125"
                    color="#6a6a6a"
                    view-box="-32 0 512 512"
                    class="network-item pa-2"
                    v-on="on"
                    @click="onClick"
                />
            </div>
        </template>
        <span>VK - войти в социальную cеть</span>
    </v-tooltip>
</template>
<style lang="scss" scoped>
    .network-item {
        cursor: pointer;
    }
</style>
