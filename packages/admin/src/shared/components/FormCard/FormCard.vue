<script setup lang="ts">
</script>
<template>
    <v-card
        elevation="2"
        style="width: 100%"
        color="white"
        class="form-card"
    >
        <v-card-title class="form-card__title">
            <div class="form-card__title-text primary white--text px-3 py-2 elevation-2 d-flex justify-center align-center">
                <slot name="title"/>
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

        &__title {
            font-size: .9rem;
            padding: 0;
            min-height: 32px;
            position: relative;

            &-text {
                position: absolute;
                left: 10px;
                top: -10px;
                border-radius: $border-radius;
            }
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
