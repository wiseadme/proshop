<script lang="ts" setup>
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'
</script>
<template>
    <v-card
        style="width: 600px"
        color="white"
        elevation="3"
        class="modal-card app-border-radius"
    >
        <v-card-title
            v-if="$slots.title"
            class="modal-card__title grey lighten-2 py-5 d-flex justify-center align-center elevation-2"
        >
            <div class="modal-card__title-icon white mr-2 app-border-radius elevation-2 pt-2 pb-1 px-3">
                <v-svg :path="SvgPaths.NEWSPAPER"/>
            </div>
            <div class="modal-card__title-text">
                <h4 class="primary--text">
                    <slot name="title"/>
                </h4>
            </div>
        </v-card-title>
        <v-card-content>
            <slot name="content"/>
        </v-card-content>
        <v-card-actions>
            <slot name="actions"/>
        </v-card-actions>
    </v-card>
</template>
<style lang="scss" scoped>
    .modal-card {
        &__title {
            &-text {

            }
        }
    }
</style>
