<script lang="ts" setup>
    import {
        ref,
        unref,
        watch,
    } from 'vue'

    import draggable from 'vuedraggable'

    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    import type { IAsset } from '@proshop-app/types'

    import { SvgPaths } from '@shared/enums/svg-paths'
    import { clone } from '@shared/helpers'

    const props = defineProps<{
        assets: IAsset[]
        main: Maybe<string>
    }>()

    const emit = defineEmits<{
        (e: 'load', value: File[]): void
        (e: 'delete', value: Maybe<IAsset>): void
        (e: 'update:main', value: Maybe<IAsset>): void
        (e: 'update:order', value: IAsset[]): void
    }>()

    const currentImage = ref<Maybe<IAsset>>(null)
    const loadedImages = ref<File[]>([])
    const clonedItems = ref<IAsset[]>([])

    const imagesContextMenu = ref({
        show: false,
        positionX: 0,
        positionY: 0,
    })

    const onImageContextMenu = (event: MouseEvent, asset: IAsset) => {
        unref(imagesContextMenu).show = true
        unref(imagesContextMenu).positionX = event.clientX
        unref(imagesContextMenu).positionY = event.clientY

        currentImage.value = clone(asset)
    }

    const onChange = () => {
        unref(clonedItems).forEach((it, i) => it.order = i)
        emit('update:order', unref(clonedItems))
    }

    watch(() => props.assets.length, () => {
        clonedItems.value = clone(props.assets)
    }, { immediate: true })

</script>
<template>
    <v-layout>
        <v-row>
            <v-col
                cols="8"
                offset="2"
            >
                <form-card>
                    <template #icon>
                        <v-svg :path="SvgPaths.CAMERA"/>
                    </template>
                    <template #title>
                        Отображаемые фото
                    </template>
                    <template #body>
                        <v-file-input
                            label="Загрузите изображение"
                            :value="loadedImages"
                            color="primary"
                            text-color="content"
                            @update:value="$emit('load', $event)"
                        />
                        <draggable
                            :list="clonedItems"
                            item-key="id"
                            class="d-flex justify-start align-center flex-wrap"
                            @change="onChange"
                        >
                            <template #item="{element}">
                                <div class="d-flex">
                                    <div
                                        class="image mr-2 mb-2 white elevation-2"
                                        :class="{'product-image--main': element.url === main}"
                                        style="height: 150px; width: 150px; overflow: hidden; position: relative; border-radius: 10px; padding: 0"
                                        @contextmenu.prevent="onImageContextMenu($event, element)"
                                    >
                                        <img
                                            style="height: 150px; width: 100%; object-fit: cover"
                                            :src="element.url"
                                        >
                                        <v-button
                                            style="position: absolute; top: 5px; right: 5px"
                                            round
                                            color="white"
                                            elevation="2"
                                            @click="$emit('delete', element)"
                                        >
                                            <v-icon color="grey darken-4">
                                                fas fa-times
                                            </v-icon>
                                        </v-button>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </template>
                </form-card>
            </v-col>
        </v-row>
        <v-menu
            v-model="imagesContextMenu.show"
            :position-x="imagesContextMenu.positionX"
            :position-y="imagesContextMenu.positionY"
            width="200"
            absolute
            open-on-click
            @hide="imagesContextMenu.show = false"
        >
            <v-list
                class="images-menu white"
            >
                <v-list-item
                    class="images-menu__item"
                    @click="emit('update:main', currentImage)"
                >
                    <v-list-item-title>
                        установить главным
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    class="images-menu__item"
                    @click="emit('delete', currentImage)"
                >
                    <v-list-item-title>
                        удалить
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-layout>
</template>
<style lang="scss" scoped>
    @import "ImagesLoader";
</style>
