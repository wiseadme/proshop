<script lang="ts" setup>
  import { watch } from 'vue'
  import draggable from 'vuedraggable'
  import { useUnitService } from '@modules/unit/service/unit.service'
  import { useLoadingState } from '@shared/composables/use-loading-state'
  import { clone } from '@shared/helpers'
  import { Unit } from '@modules/unit/model/unit.model'
  import { IUnit } from '@ecommerce-platform/types'

  let model = $ref<IUnit>(Unit.create())
  let units = $ref<Maybe<Array<IUnit>>>(null)
  let isUpdate = $ref(false)

  const service = useUnitService()
  const { loading, setLoadingState } = useLoadingState()

  const onSave = (validate) => {
    setLoadingState(true)

    let promise

    validate().then(() => {
      if (isUpdate) {
        promise = service.updateUnit(model)
      } else {
        promise = service.createUnit(model)
      }

      promise.then(() => setLoadingState(false))
    })
  }

  const onDelete = (item) => {
    return service.deleteUnit(item._id)
  }

  const clearForm = () => {
    model = Unit.create()
  }

  const onChange = () => {
    console.log('change')
  }

  const onEdit = (unit) => {
    isUpdate = true
    service.setAsCurrent(unit)
    model = Unit.create(unit)
  }

  watch(
    () => service.units,
    to => units = clone(to),
    { immediate: true, deep: true }
  )

  service.getUnits()
</script>
<template>
  <v-layout column>
    <v-row>
      <v-col
        xl="4"
        lg="6"
        md="12"
        sm="12"
      >
        <v-form v-slot="{validate}">
          <v-card
            width="100%"
            elevation="2"
            color="#ffffff"
          >
            <v-card-title class="primary--text">
              <h3>Измерения</h3>
            </v-card-title>
            <v-card-content>
              <v-text-field
                v-model="model.value"
                label="Название*"
                color="#272727"
                :rules="[val => !!val || 'Обязательное поле']"
              />
              <v-text-field
                v-model="model.meta"
                label="Мета информация"
                color="#272727"
              />
            </v-card-content>
            <v-card-actions class="">
              <v-button
                elevation="2"
                color="primary"
                :loading="loading"
                @click="onSave(validate)"
              >
                <v-icon
                  size="14"
                >
                  fas fa-plus
                </v-icon>
              </v-button>
              <v-button
                elevation="2"
                color="error"
                class="ml-2"
                @click="clearForm"
              >
                <v-icon
                  size="14"
                >
                  fas fa-trash-alt
                </v-icon>
              </v-button>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col
        xl="8"
        lg="6"
        md="12"
        sm="12"
      >
        <template v-if="units">
          <draggable
            v-model="units"
            item-key="_id"
            @change="onChange"
          >
            <template #item="{element}">
              <div
                class="d-flex justify-start align-center elevation-2 my-1 py-2 px-3 white"
              >
                <v-icon
                  class="mr-3"
                  color="grey lighten-2"
                >
                  fas fa-grip-vertical
                </v-icon>
                <span>
                  {{ element.value }}
                </span>
                <v-spacer></v-spacer>
                <v-button
                  round
                  color="primary"
                  elevation="2"
                  class="mr-2"
                  @click="onEdit(element)"
                >
                  <v-icon>
                    fas fa-pen
                  </v-icon>
                </v-button>
                <v-button
                  color="error"
                  elevation="2"
                  round
                  @click="onDelete(element)"
                >
                  <v-icon>
                    fas fa-times
                  </v-icon>
                </v-button>
              </div>
            </template>
          </draggable>
        </template>
      </v-col>
    </v-row>
  </v-layout>
</template>
