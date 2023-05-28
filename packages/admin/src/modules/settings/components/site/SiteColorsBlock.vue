<script lang="ts" setup>
    import { ref } from 'vue'
    import { ColorPicker } from 'vue-color-kit'

    const showColorPicker = ref(false)
    const positionX = ref(0)
    const positionY = ref(0)

    const selected = ref<any>({})
    const suckerHide = ref(true)
    const onChange = (data) => {
        selected.value.color = data.hex
    }

    const onContextMenu = (e, item) => {
        selected.value = item

        positionX.value = e.clientX
        positionY.value = e.clientY

        showColorPicker.value = true
    }

    const palette = ref([
        {
            color: '#00003b',
            name: 'Primary цвет',
            type: 'primary',
        },
        {
            color: '#18bee3',
            name: 'Secondary цвет',
            type: 'secondary',
        },
    ])
</script>
<template>
    <v-menu
        v-model="showColorPicker"
        :position-x="positionX"
        :position-y="positionY"
        width="220"
        max-height="338"
        :close-on-click="false"
        @hide="showColorPicker = false"
    >
        <div class="color-picker-wrapper d-flex justify-center align-center">
            <color-picker
                :key="selected.name"
                :color="selected.color"
                theme="light"
                class="elevation-2"
                style="width: 220px"
                :sucker-hide="suckerHide"
                @change-color="onChange"
            />
        </div>
    </v-menu>
    <v-card
        color="white"
        elevation="2"
        width="600"
    >
        <v-card-title class="primary--text">
            Палитра
        </v-card-title>
        <v-card-content>
            <div class="colors">
                <div
                    v-for="item in palette"
                    :key="item.name"
                    class="colors__item d-flex align-center py-2"
                >
                    <div class="colors__item-name">
                        {{ item.name }}
                    </div>
                    <v-spacer/>
                    <div
                        class="colors__color white--text d-flex align-center justify-center px-2"
                        :style="{backgroundColor: item.color, width: '75px', height: '30px', cursor: 'pointer', pointerEvents: 'auto'}"
                        @contextmenu.prevent="onContextMenu($event, item)"
                    >
                        {{ item.color }}
                    </div>
                </div>
            </div>
        </v-card-content>
    </v-card>
</template>
<style lang="scss" scoped>

</style>
