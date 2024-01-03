<script lang="ts" setup>
    import { Notify } from '@shared/components/VNotifications/types'

    const { params = {} as Notify, color = 'blue' } = defineProps<{
        params: Notify
        color: string
    }>()

    const emit = defineEmits<{
        (e: 'destroy', params: Notify): void
    }>()

    const onClick = () => {
        if (params.actions?.events?.onClick) {
            return params.actions.events.onClick()
        }

        if (!params?.closeOnClick) {
            return
        }

        emit('destroy', params)
    }
</script>
<template>
    <v-card
        class="v-info-notification"
        :color="color"
        elevation="4"
        @click="onClick"
    >
        <v-card-title class="white--text">
            <v-icon
                icon="fas fa-info-circle"
                class="mr-3"
            />
            <h4>{{ params.title }}</h4>
        </v-card-title>
        <v-card-content class="white--text">
            {{ params.text }}
        </v-card-content>
    </v-card>
</template>
