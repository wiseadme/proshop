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
        elevation="2"
        :style="{width, height}"
        color="white"
        class="form-card"
    >
        <v-card-title class="form-card__head">
            <div class="form-card__icon primary white--text px-3 py-2 elevation-2 d-flex justify-center align-center">
                <div class="form-card__icon-item">
                    <slot name="icon"/>
                </div>
            </div>
            <div class="form-card__title elevation-1 secondary--text px-3 py-2 d-flex justify-center align-center">
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
        <v-card-content class="form-card__body">
            <slot name="body"/>
        </v-card-content>
        <v-card-actions v-if="$slots.actions">
            <slot name="actions"/>
        </v-card-actions>
    </v-card>
</template>
<style lang="scss">
    .form-card {
        overflow: visible;
        border-radius: $border-radius;

        &__head {
            position: relative;
        }

        &__icon {
            font-size: .9rem;
            padding: 0;
            min-height: 32px;
            position: absolute;
            left: 10px;
            top: -10px;
            border-radius: $border-radius;

            &-item {

            }
        }

        &__title {
            position: absolute;
            right: 0;
            top: 0;
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
