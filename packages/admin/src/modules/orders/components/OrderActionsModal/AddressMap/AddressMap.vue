<script lang="ts" setup>
    import { watch } from 'vue'
    import { useYandexMaps } from '@shared/composables/use-yandex-maps'

    const {
        coords = [55.87, 37.66],
        address = ''
    } = defineProps<{
        coords: number[]
        address: string
    }>()

    const { addYmapsScript } = useYandexMaps()

    let yandexMaps: any = null
    let map: any = null
    let marker: any = null

    addYmapsScript()

    const getYmaps = () => new Promise(resolve => {
        const tryGetYmaps = () => {
            const { ymaps } = window as any

            if (ymaps && typeof ymaps.Map === 'function') {
                yandexMaps = ymaps

                return resolve(ymaps)
            }

            setTimeout(tryGetYmaps)
        }

        tryGetYmaps()
    })
    const setAddressMarker = () => {
        if (marker) {
            map.geoObjects.remove(marker)
        }

        if (!yandexMaps) {
            return
        }

        marker = new yandexMaps.Placemark(coords, {}, {
            preset: 'islands#icon',
            iconColor: '#0095b6',
        })

        map.setCenter(coords)

        map.geoObjects.add(marker)
    }

    const init = () => {
        map = new yandexMaps.Map('map', {
            center: coords,
            zoom: 16,
            controls: [],
        })
    }

    watch(() => coords, setAddressMarker)

    getYmaps().then(() => {
        init()
        setAddressMarker()
    })

</script>
<template>
    <div class="map-service">
        <div class="map-service__address elevation-2">
            <h3>{{ address }}</h3>
        </div>
        <div id="map"/>
    </div>
</template>
<style lang="scss">
    .map-service {
        height: 400px;
        position: relative;

        &__address {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 5px 8px;
            z-index: 1;
            background: #ffffff;
            border-radius: 10px;
        }
    }

    #map {
        height: 100%;
    }
</style>
