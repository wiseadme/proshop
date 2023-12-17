<script lang="ts" setup>
    import {useUnit} from '@modules/units/composables/use-unit'
    import ModalCard from '@shared/components/Modals/ModalCard.vue'

    const {
        model,
        loading,
        showUnitForm,
        clearUnitModel,
        onSaveUnit,
    } = useUnit()

</script>
<template>
    <v-modal
        v-model="showUnitForm"
        transition="scale-in"
        overlay
    >
        <v-form v-slot="{validate}">
            <modal-card @close="showUnitForm = false">
                <template #title>
                    Форма создания измерения
                </template>
                <template #content>
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
                </template>
                <template #actions>
                    <v-button
                        elevation="2"
                        class="app-border-radius"
                        color="success"
                        :loading="loading"
                        width="120"
                        @click="onSaveUnit(validate)"
                    >
                        Сохранить
                    </v-button>
                    <v-button
                        elevation="2"
                        color="secondary"
                        class="ml-2 app-border-radius"
                        width="120"
                        @click="clearUnitModel"
                    >
                        Очистить
                    </v-button>
                </template>
            </modal-card>
        </v-form>
    </v-modal>
</template>
