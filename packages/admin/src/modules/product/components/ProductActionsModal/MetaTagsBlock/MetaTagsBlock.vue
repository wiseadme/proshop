<script setup lang="ts">
  defineProps({
    metaTags: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  })
</script>
<template>
  <v-layout>
    <v-row>
      <v-col class="white mt-2 elevation-2">
        <v-card width="100%">
          <v-card-title>
            <h3 class="primary--text">
              Мета теги
            </h3>
          </v-card-title>
          <v-card-content>
            <div
              v-for="it in items"
              :key="it.content"
            >
              {{ it }}
            </div>
          </v-card-content>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
