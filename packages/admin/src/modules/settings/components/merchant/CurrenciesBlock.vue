<script lang="ts" setup>
  import { useMerchant } from '@modules/settings/composables/use-merchant'
  import currencies from '@shared/data/currencies.json'

  const { model } = useMerchant()

</script>
<template>
  <v-card style="width: 100%">
    <v-card-title class="primary--text">
      Валюта
    </v-card-title>
    <v-card-content>
      <v-select
        v-model="model.currency"
        label="Валюта *"
        :rules="[val => !!val]"
        value-key="name"
        typeable
      >
        <template #prepend-icon>
          <v-icon icon="fas fa-time"></v-icon>
        </template>
        <template #select-list="{onSelect}">
          <v-list active>
            <v-list-item
              v-for="it in currencies"
              :key="it.code"
              @click="onSelect(it)"
            >
              <v-list-item-icon>
                {{ it.symbol }}
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="mr-2">{{ it.code }}</span>
                  <span>{{ it.name }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ it.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </v-select>
    </v-card-content>
  </v-card>
</template>
