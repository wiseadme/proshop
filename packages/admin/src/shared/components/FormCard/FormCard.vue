<script setup lang="ts">
    const {
        width = '100%',
        height = '100%',
    } = defineProps<{
        height?: string
        width?: string
    }>()
</script>
<template>
    <v-card
        :style="{width, height}"
        color=""
        class="form-card"
    >
        <v-card-title class="grey lighten-2 form-card__head py-4 elevation-2 mb-2 app-border-radius">
            <v-tooltip
                v-if="$slots.tooltip"
                right
                offset-x="10"
                color="rgba(0,0,0,.7)"
                elevation="3"
                style="max-height: fit-content"
            >
                <template #activator="{on}">
                    <div
                        class="form-card__icon primary white--text px-3 py-2 elevation-2 d-flex justify-center align-center"
                        v-on="on"
                    >
                        <div class="form-card__icon-item">
                            <slot name="icon"/>
                        </div>
                    </div>
                </template>
                <div style="max-width: 200px; white-space: normal; height: auto; min-height: 80px">
                    <slot name="tooltip"/>
                </div>
            </v-tooltip>
            <div
                v-else
                class="form-card__icon white white--text px-3 py-2 elevation-2 d-flex justify-center align-center"
            >
                <div class="form-card__icon-item">
                    <slot name="icon"/>
                </div>
            </div>
            <div class="form-card__title elevation-1 white secondary--text px-3 py-2 ml-2 d-flex justify-center align-center">
                <div class="form-card__title-text">
                    <slot name="title"/>
                </div>
            </div>
        </v-card-title>

        <v-card-subtitle
            v-if="$slots.subtitle"
            class="form-card__subtitle"
            style=""
        >
            <div class="px-3 mt-2">
                <slot name="subtitle"/>
            </div>
        </v-card-subtitle>
        <v-card-content
            class="form-card__body white elevation-2 pa-4 app-border-radius"
            style="flex-grow: 1"
        >
            <slot name="body"/>
        </v-card-content>
        <v-card-actions
            v-if="$slots.actions"
            class="white elevation-2 pa-4 mt-2 app-border-radius"
        >
            <slot name="actions"/>
        </v-card-actions>
    </v-card>
</template>
<style lang="scss">
    .form-card {
        overflow: visible;
        border-radius: $border-radius;
        display: flex;
        flex-direction: column;
        justify-content: start;

        &__head {
            position: relative;
        }

        &__icon {
            font-size: .9rem;
            padding: 0;
            min-height: 32px;
            border-radius: $border-radius;

            &-item {

            }
        }

        &__title {
            font-size: .8rem;
            border-bottom-left-radius: $border-radius;
            border-top-right-radius: $border-radius;
            font-weight: 700;
        }


        &__body {
            overflow-x: auto;
        }

        &__subtitle {
            font-size: .7rem;
            padding: 0;
            min-height: 32px;
        }
    }
</style>
