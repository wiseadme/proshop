<script lang="ts" setup>
    import { useUnitsService } from '@modules/units/composables/use-units-service'
    import { useUnit } from '@modules/units/composables/use-unit'
    import { ItemsList } from '@shared/components/ItemsList'

    const { units, getUnits } = useUnitsService()

    const {
        model,
        loading,
        clearUnitModel,
        onSaveUnit,
        onEditUnit,
        onDeleteUnit,
    } = useUnit()

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
                    <items-list
                        :items="units"
                        @delete="onDeleteUnit"
                        @edit="onEditUnit"
                    >
                        <template #title="{item}">
                            {{ item.value }}
                        </template>
                    </items-list>
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
