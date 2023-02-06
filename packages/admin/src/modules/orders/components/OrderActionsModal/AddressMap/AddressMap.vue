<script setup lang="ts">
  import { watch } from 'vue'
  import { addYmapsScript } from '@modules/orders/helpers'

  const props = defineProps({
    coords: {
      type: Array,
      default: () => [ 55.87, 37.66 ]
    },
    address: {
      type: String,
      default: ''
    }
  })

  let yandexMaps: any = null
  let map: any = null
  let marker: any = null

  addYmapsScript()

  const getYmaps = () => new Promise(resolve => {
    const tryGetYmaps = () => {
      const { ymaps } = window as any

      if (ymaps && typeof ymaps.Map === 'function') {
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

    marker = new yandexMaps.Placemark(props.coords, {}, {
      preset: 'islands#icon',
      iconColor: '#0095b6'
    })

    map.setCenter(props.coords)

    map.geoObjects.add(marker)
  }

  const init = (ymaps) => {
    yandexMaps = ymaps

    map = new ymaps.Map('map', {
      center: props.coords,
      zoom: 16,
      controls: []
    })
  }

  watch(() => props.coords, setAddressMarker)

  getYmaps().then((maps) => {
    init(maps)
    setAddressMarker()
  })

</script>
<template>
  <div class="map-service">
    <div class="map-service__address elevation-2">
      <h3>{{ props.address }}</h3>
    </div>
    <div id="map"></div>
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
