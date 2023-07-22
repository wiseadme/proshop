<script lang="ts" setup>
    import { useUnitsService } from '@modules/unit/composables/use-units-service'
    import { useUnit } from '@modules/unit/composables/use-unit'
    import draggable from 'vuedraggable'

    const { units, getUnits } = useUnitsService()

    const {
        model,
        loading,
        clearUnitModel,
        onSaveUnit,
        onEditUnit,
        onDeleteUnit,
    } = useUnit()

    const onChange = () => {
    }

    getUnits()

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
                        color="white"
                        class="app-border-radius"
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
                                class="app-border-radius"
                                color="primary"
                                :loading="loading"
                                width="120"
                                @click="onSaveUnit(validate)"
                            >
                                Сохранить
                            </v-button>
                            <v-button
                                elevation="2"
                                color="warning"
                                class="ml-2 app-border-radius"
                                width="120"
                                @click="clearUnitModel"
                            >
                                Очистить
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
                        class="units"
                        @change="onChange"
                    >
                        <template #item="{element}">
                            <div
                                class="units__item d-flex justify-start align-center elevation-2 my-1 py-2 px-3 white app-border-radius"
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

                                <v-icon
                                    color="primary"
                                    class="mr-2"
                                    clickable
                                    @click="onEditUnit(element)"
                                >
                                    fas fa-pen
                                </v-icon>
                                <v-icon
                                    color="error"
                                    clickable
                                    @click="onDeleteUnit(element._id)"
                                >
                                    fas fa-times
                                </v-icon>
                            </div>
                        </template>
                    </draggable>
                </template>
            </v-col>
        </v-row>
    </v-layout>
</template>
<style lang="scss">
    .units {
        &__item {
            height: 50px;
        }
    }
</style>
