<script lang="ts" setup>
  import { useCurrency } from '@modules/settings/composables/currency/use-currency'

  const { model } = useCurrency()
</script>
<template>
  <v-card
    color="white"
    elevation="2"
    style="width:100%"
    class="app-border-radius"
  >
    <v-card-title>
      Валюта
    </v-card-title>
    <v-card-content>
      <v-form v-slot="{validate}">
        <v-text-field
          v-model="model.name"
          label="Наименование валюты"
        />
        <v-text-field
          v-model="model.symbol"
          label="Символ валюты"
        />
        <v-text-field
          v-model="model.symbol"
          label="Описание валюты"
        />
        <v-button
          rounded
          color="primary"
          elevation="2"
          @click="validate"
        >
          создать
        </v-button>
      </v-form>
    </v-card-content>
  </v-card>
</template>
