<script lang="ts" setup>
  import { Notify } from '@shared/components/VNotifications/types'

  const props = withDefaults(defineProps<{
    params: Notify
  }>(), {
    params: () => ({})
  })

  const emit = defineEmits<{
    (e: 'destroy', params: Notify): void
  }>()

  const onClick = () => {
    if (props.params.actions?.events?.onClick) {
      return props.params.actions.events.onClick()
    }

    if (!props.params?.closeOnClick) {
      return
    }

    emit('destroy', props.params)
  }
</script>
<template>
  <v-card
    class="v-info-notification"
    :color="props.color"
    elevation="4"
    @click="onClick"
  >
    <v-card-title class="white--text">
      <v-icon
        icon="fas fa-info-circle"
        class="mr-3"
      />
      <h4>{{ props.params.title }}</h4>
    </v-card-title>
    <v-card-content class="white--text">
      {{ props.params.text }}
    </v-card-content>
  </v-card>
</template>
