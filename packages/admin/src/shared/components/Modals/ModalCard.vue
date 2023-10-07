<script lang="ts" setup>
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { width = 600 } = defineProps<{
        width: number
    }>()
</script>
<template>
    <v-card
        :style="{width: `${width}px`}"
        color="white"
        elevation="3"
        class="modal-card app-border-radius"
    >
        <v-card-title
            v-if="$slots.title"
            class="modal-card__header white py-5 d-flex justify-center align-center elevation-2"
        >
            <div class="modal-card__header-icon success mr-2 app-border-radius elevation-2 pt-2 pb-1 px-3">
                <v-svg
                    color="#ffffff"
                    :path="SvgPaths.NEWSPAPER"
                />
            </div>
            <div
                class="modal-card__header-text"
                style="font-size: .9rem"
            >
                <h4 class="primary--text">
                    <slot name="title"/>
                </h4>
            </div>
            <v-spacer/>
            <div
                v-if="$slots.header"
                class="modal-card__header-btn"
            >
                <slot name="header"/>
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
