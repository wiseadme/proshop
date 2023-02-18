<script setup lang="ts">
  import { ColorPicker } from 'vue-color-kit'

  let color = $ref('#fa5a5a')
  let suckerCanvas = $ref(null)
  let suckerArea = $ref([])
  let suckerHide = $ref(false)

  const onChange = (data) => {
    color = data.hex
  }
</script>
<template>
  <v-layout>
    <v-row>
      <v-col>
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
            :sucker-canvas="suckerCanvas"
            :sucker-area="suckerArea"
            @change-color="onChange"
          />
        </div>
      </v-col>
    </v-row>
  </v-layout>
</template>
<style lang="scss">
  @import "vue-color-kit/dist/vue-color-kit.css";
</style>
