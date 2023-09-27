<script lang="ts" setup>
    import { ref, unref } from 'vue'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { clone } from '@shared/helpers'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { IAsset } from '@proshop/types'

    defineProps<{
        assets: IAsset[]
    }>()

    defineEmits<{
        (e: 'load', value: File[]): void
        (e: 'delete', value: IAsset): void
        (e: 'main', value: IAsset): void
    }>()

    const currentImage = ref(null)
    const loadedImages = ref([])

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
                        Главные фото отображаемые на странице товара
                    </template>
                    <template #body>
                        <v-file-input
                            label="Загрузите изображение"
                            :value="loadedImages"
                            color="primary"
                            text-color="content"
                            @update:value="$emit('load', $event)"
                        />
                        <div class="images-container d-flex flex-wrap">
                            <div
                                v-for="it in assets"
                                :key="it.id"
                                class="image mr-2 mb-2 white elevation-2"
                                :class="{'product-image--main': it.main}"
                                style="height: 150px; width: 150px; overflow: hidden; position: relative; border-radius: 10px; padding: 0"
                                @contextmenu.prevent="onImageContextMenu($event, it)"
                            >
                                <img
                                    style="height: 150px; width: 100%; object-fit: cover"
                                    :src="it.url"
                                >
                                <v-button
                                    style="position: absolute; top: 5px; right: 5px"
                                    round
                                    color="white"
                                    elevation="2"
                                    @click="$emit('delete', it)"
                                >
                                    <v-icon color="grey darken-4">
                                        fas fa-times
                                    </v-icon>
                                </v-button>
                            </div>
                        </div>
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
                    @click="$emit('main', currentImage)"
                >
                    <v-list-item-title>
                        установить главным
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    class="images-menu__item"
                    @click="$emit('delete', currentImage)"
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
    @import "@modules/products/components/ProductBlocks/styles/ProductImagesBlock";
</style>
