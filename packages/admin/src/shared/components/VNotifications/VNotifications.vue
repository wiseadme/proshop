<script setup lang="ts">
  import { onMounted } from 'vue'
  import { emitter } from './events'
  import { Notify } from './types'
  import {
    InfoNotification,
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
  }

  let notifications = $ref<Notify[]>([])

  const addItem = (params: Notify) => {
    notifications.push(params)
  }

  const removeItem = (params: Notify) => {
    notifications = notifications.filter(it => it.id !== params.id)
  }

  const clearAll = () => {
    notifications = []
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
    emitter.on('add', addItem)
    emitter.on('remove', removeItem)
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
        @destroy="removeItem"
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
