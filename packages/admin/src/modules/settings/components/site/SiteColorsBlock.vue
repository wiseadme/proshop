<script lang="ts" setup>
    import { ref } from 'vue'
    import { ColorPicker } from 'vue-color-kit'

    const showColorPicker = ref(false)
    const positionX = ref(0)
    const positionY = ref(0)

    const color = ref('#fa5a5a')
    // const suckerCanvas = ref(null)
    // const suckerArea = ref([])
    const suckerHide = ref(true)
    const onChange = (data) => {
        color.value = data.hex
    }
</script>
<template>
    <v-menu
        v-model="showColorPicker"
        :position-x="positionX"
        :position-y="positionY"
    >
        <div
            class="color-picker-wrapper d-flex justify-center align-center"
            :style="{height: '400px'}"
        >
            <color-picker
                theme="light"
                :color="color"
                class="elevation-2"
                style="width: 220px"
                :sucker-hide="suckerHide"
                @change-color="onChange"
            />
        </div>
    </v-menu>
</template>
