<script setup lang="ts">
  import { addYmapsScript } from '@modules/orders/helpers'

  const props = defineProps({
    coords: {
      type: Array,
      default: () => [ 55.87, 37.66 ]
    }
  })

  let map = null

  addYmapsScript(process.env.YANDEX_MAP_API_KEY)

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

  const init = (ymaps) => {
    // const searchControl = new ymaps.control.SearchControl({
    //   options: {
    //     noSuggestPanel: true
    //   }
    // })

    // const geolocationControl = new ymaps.control.GeolocationControl()

    map = new ymaps.Map('map', {
      center: props.coords,
      zoom: 10,
      controls: []
    })

    console.log(map)
  }

  getYmaps().then(init)

</script>
<template>
  <div>
    <div
      id="map"
      style="height: 400px;"
    >
    </div>
  </div>
</template>
