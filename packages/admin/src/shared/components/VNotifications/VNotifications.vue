<script lang="ts" setup>
    import { computed, onMounted } from 'vue'
    import { useEventEmitter } from './use-event-emitter'
    import { Notify } from './types'
    import {
        ErrorNotification,
        InfoNotification,
        SimpleNotification,
        SuccessNotification,
        WarningNotification,
    } from './components'

    const { transition = 'fade', position = 'top right' } = defineProps<{
        transition?: string
        position?: string
    }>()

    const positions = position.split(' ')

    const { on } = useEventEmitter()

    const notifyComponents = {
        info: InfoNotification,
        success: SuccessNotification,
        warning: WarningNotification,
        simple: SimpleNotification,
        error: ErrorNotification,
    }

    let notifications = $ref<Notify[]>([])
    let isClickable = false

    const addNotification = (params: Notify) => {
        notifications.push(params)
    }

    const removeNotification = (id) => {
        notifications = notifications.filter(it => it.id !== id)
    }

    const clearAll = () => {
        notifications = []
    }

    const onClick = (notify) => {
        if (!isClickable) {
            return
        }

        removeNotification(notify.id)
    }

    const styles = computed(() => positions.reduce((acc, pos) => {
        if (pos === 'center') {
            acc['left'] = '50%'
            acc['transform'] = 'translateX(-50%)'
        } else {
            acc[pos] = '10px'
        }

        return acc
    }, {}))

    onMounted(() => {
        on('add', addNotification)
        on('remove', removeNotification)
        on('add-listener', () => isClickable = true)
        on('clear', clearAll)
    })

</script>
<template>
    <div
        class="v-notifications"
        :style="styles"
    >
        <transition-group
            :name="transition"
            :move-class="transition"
            tag="div"
        >
            <component
                :is="notifyComponents[notify.type]"
                v-for="notify in notifications"
                :key="notify.id"
                :params="notify"
                class="my-1"
                @click="onClick(notify)"
                @destroy="removeNotification"
            >
            </component>
        </transition-group>
    </div>
</template>
<style lang="scss">
    .v-notifications {
        display: block;
        position: fixed;
        z-index: 5000;
        padding: 10px;
    }
</style>
