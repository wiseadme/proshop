<script lang="ts" setup>
  import { ref } from 'vue'
  import { ColorPicker } from 'vue-color-kit'

  const color = ref('#fa5a5a')
  const suckerCanvas = ref(null)
  const suckerArea = ref([])
  const suckerHide = ref(false)
  const onChange = (data) => {
    color.value = data.hex
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
