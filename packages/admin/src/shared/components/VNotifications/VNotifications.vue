<script setup lang="ts">
  import { onMounted } from 'vue'
  import { emitter } from './events'
  import { Notify } from './types'
  import {
    InfoNotification,
    SimpleNotification,
    SuccessNotification,
    WarningNotification
  } from './components'

  const props = defineProps({
    transition: {
      type: String,
      default: 'fade'
    },
    position: {
      type: String,
      default: 'top right'
    }
  })

  const positions = props.position.split(' ')

  const notifyComponents = {
    info: InfoNotification,
    success: SuccessNotification,
    warning: WarningNotification,
    simple: SimpleNotification
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
    console.log(notify)
    if (!isClickable) {
      return
    }

    removeNotification(notify.id)
  }

  const styles = $computed(() => positions.reduce((acc, pos) => {
    if (pos === 'center') {
      acc['left'] = '50%'
      acc['transform'] = 'translateX(-50%)'
    } else {
      acc[pos] = '10px'
    }

    return acc
  }, {}))

  onMounted(() => {
    emitter.on('add', addNotification)
    emitter.on('remove', removeNotification)
    emitter.on('add-listener',() => isClickable = true)
    emitter.on('clear', clearAll)
  })

</script>
<template>
  <div
    class="v-notifications"
    :style="styles"
  >
    <transition-group
      :name="props.transition"
      :move-class="props.transition"
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
