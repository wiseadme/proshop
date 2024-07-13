<script lang="ts" setup>
    import { useAttributeForm } from '@modules/attributes/composables/use-attribute-form'
    import { useAttributeModel } from '@modules/attributes/composables/use-attribute-model'

    import { ModalCard } from '@shared/components/Modals'

    const { model, setAttributeModel } = useAttributeModel()
    const { onSubmit, isFormVisible } = useAttributeForm()

</script>
<template>
    <v-modal
        v-model="isFormVisible"
        overlay
        transition="scale-in"
    >
        <v-form v-slot="{validate}">
            <modal-card @close="isFormVisible = false">
                <template #title>
                    Форма создания атрибутов товара
                </template>
                <template #content>
                    <div class="attribute-form">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="model.key"
                                    label="Название*"
                                    :rules="[val => !!val || 'Обязательное поле']"
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="model.value"
                                    label="Значение по умолчанию*"
                                    :rules="[val => !!val || 'Обязательное поле']"
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="model.meta"
                                    label="Мета информация"
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="model.order"
                                    label="Порядковый номер"
                                    type="number"
                                />
                            </v-col>
                        </v-row>
                    </div>
                </template>
                <template #actions>
                    <v-button
                        elevation="2"
                        color="success"
                        class="app-border-radius"
                        width="120"
                        rounded
                        @click="onSubmit(validate)"
                    >
                        Сохранить
                    </v-button>
                    <v-button
                        elevation="2"
                        color="secondary"
                        class="ml-2 app-border-radius"
                        width="120"
                        @click="setAttributeModel"
                    >
                        Очистить
                    </v-button>
                </template>
            </modal-card>
        </v-form>
    </v-modal>
</template>
