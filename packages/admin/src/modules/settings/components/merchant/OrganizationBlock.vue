<script lang="ts" setup>
  import { useMerchant } from '@modules/settings/composables/use-merchant'

  const { model } = useMerchant()
</script>
<template>
  <v-card style="width: 100%">
    <v-card-title class="primary--text">
      Организация
    </v-card-title>
    <v-card-content>
      <v-row>
        <v-col>
          <v-text-field
            v-model="model.organization"
            :rules="[val => !!val]"
            placeholder="ООО Пример"
            label="Организация *"
          />
          <v-text-field
            v-model="model.name"
            :rules="[val => !!val]"
            label="Название *"
          />
          <v-text-field
            v-model="model.description"
            label="Описание"
          />
          <v-text-field
            v-model="model.slogan"
            label="Слоган"
          />
        </v-col>
      </v-row>
    </v-card-content>
  </v-card>
</template>
