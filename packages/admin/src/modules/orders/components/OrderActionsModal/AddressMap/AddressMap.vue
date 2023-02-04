<script setup lang="ts">
  import { onMounted } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'

  const tileLayer = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}@2x.png?key=DXBhrLVYaeuix0IPoCn3'

  const layerOptions = {
    maxZoom: 19,
    minZoom: 2,
    edgeBufferTiles: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }

  onMounted(() => {
    const map = L.map('map').setView([41.322655, 69.281718], 19);
    const layer = L.tileLayer(tileLayer, layerOptions);

    map.addLayer(layer)

    setTimeout(() => map.invalidateSize())
  })


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
