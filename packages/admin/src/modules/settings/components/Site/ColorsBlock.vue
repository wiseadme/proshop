<script lang="ts" setup>
    import {
        computed,
        ref,
        unref
    } from 'vue'
    import { ColorPicker } from 'vue-color-kit'
    import { useSite } from '@modules/settings/composables/use-site'
    import { ISiteColors } from '@proshop/types'
    import { FormCard } from '@shared/components/FormCard'

    type PaletteItem = {
        color: string
        name: string
        type: keyof ISiteColors
    }

    const { site, model, createSite, updateSite } = useSite()
    const showColorPicker = ref(false)
    const positionX = ref(0)
    const positionY = ref(0)

    const selected = ref<Partial<PaletteItem>>({})
    const suckerHide = ref(true)
    const onChange = (data) => {
        unref(model).colors![unref(selected).type!] = data.hex
    }

    const onSave = (model) => {
        if (unref(site)) return updateSite(model)

        return createSite(model)

    }

    const onContextMenu = (e, item) => {
        selected.value = item
        positionX.value = e.clientX
        positionY.value = e.clientY
        showColorPicker.value = true
    }

    const palette = computed<PaletteItem[]>(() =>[
        {
            color: unref(model).colors!.primary || '',
            name: 'Primary цвет',
            type: 'primary',
        },
        {
            color: unref(model).colors!.secondary || '',
            name: 'Secondary цвет',
            type: 'secondary',
        },
    ])

</script>
<template>
    <v-menu
        v-model="showColorPicker"
        absolute
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
    <v-row>
        <v-col cols="6">
            <form-card width="100%">
                <template #title>
                    Палитра
                </template>
                <template #body>
                    <div
                        v-for="item in palette"
                        :key="item.name"
                        class="colors__item d-flex align-center py-2"
                    >
                        <div class="colors__item-name">
                            {{ item.name }}
                        </div>
                        <v-spacer/>
                        <v-button
                            class="colors__color app-border-radius"
                            :style="{backgroundColor: item.color, cursor: 'pointer', pointerEvents: 'auto'}"
                            width="100"
                            elevation="2"
                            :color="item.color"
                            @contextmenu.prevent="onContextMenu($event, item)"
                        >
                            {{ item.color }}
                        </v-button>
                    </div>
                </template>
                <template #actions>
                    <v-button
                        color="primary"
                        width="120"
                        class="app-border-radius"
                        elevation="2"
                        @click="onSave(model)"
                    >
                        сохранить
                    </v-button>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
<style lang="scss" scoped>
    @import "vue-color-kit/dist/vue-color-kit.css";
</style>
