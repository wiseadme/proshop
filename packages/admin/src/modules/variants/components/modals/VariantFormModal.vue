<script lang="ts" setup>
    import { unref } from 'vue'

    import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
    import { useVariant } from '@modules/variants/composables/use-variant'
    import { useVariantsService } from '@modules/variants/composables/use-variants-service'

    import { ModalCard } from '@shared/components/Modals'

    import { Variant } from '@modules/variants/model/variant.model'

    import type { IAttribute } from '@proshop/types'

    const {
        createVariant,
        updateVariant,
    } = useVariantsService()

    const {
        model,
        isEditMode,
        linkedAttribute,
        showVariantForm
    } = useVariant()

    const { attributes } = useAttributesService()

    const onCreate = async (validate: () => Promise<boolean>) => {
        await validate()
        await createVariant(unref(model))

        clearForm()
    }

    const onUpdateVariant = () => updateVariant(unref(model))

    const onSelectAttribute = (attribute: IAttribute) => {
        unref(model).attributeId = attribute.id
    }

    const clearForm = () => {
        isEditMode.value = false
        linkedAttribute.value = null
        model.value = Variant.create()
    }

    const onSubmit = (validate: () => Promise<boolean>) => {
        if (unref(isEditMode)) return onUpdateVariant()

        return onCreate(validate)
    }
</script>
<template>
    <v-modal
        v-model="showVariantForm"
        overlay
        transition="scale-in"
    >
        <v-form v-slot="{validate}">
            <modal-card @close="showVariantForm = false">
                <template #title>
                    Форма создания варианта
                </template>
                <template #content>
                    <v-text-field
                        v-model.trim="model.name"
                        label="Название группы*"
                        color="content"
                        :rules="[val => !!val || 'Обязательное поле']"
                    />
                    <v-select
                        v-model="linkedAttribute"
                        :items="attributes"
                        label="Аттрибут привязки *"
                        value-key="key"
                        @select="onSelectAttribute"
                    />
                    <v-text-field
                        v-model.trim="model.key"
                        label="Ключ (на английском, необязательно)"
                        color="content"
                    />
                </template>
                <template #actions>
                    <v-button
                        elevation="2"
                        color="success"
                        class="app-border-radius"
                        width="120"
                        @click="onSubmit(validate)"
                    >
                        {{ isEditMode ? 'Изменить' : 'Сохранить' }}
                    </v-button>
                    <v-button
                        elevation="2"
                        color="secondary"
                        class="ml-2 app-border-radius"
                        width="120"
                        rounded
                        @click="clearForm"
                    >
                        Очистить
                    </v-button>
                </template>
            </modal-card>
            <!--            <v-card-->
            <!--                width="100%"-->
            <!--                elevation="2"-->
            <!--                color="white"-->
            <!--                class="app-border-radius"-->
            <!--            >-->
            <!--                <v-card-title class="primary&#45;&#45;text">-->
            <!--                    <h3>Группы вариантов</h3>-->
            <!--                </v-card-title>-->
            <!--                <v-card-content>-->
            <!--                    <v-text-field-->
            <!--                        v-model.trim="model.group"-->
            <!--                        label="Название группы"-->
            <!--                        color="content"-->
            <!--                        :rules="[val => !!val || 'Обязательное поле']"-->
            <!--                    />-->
            <!--                    <v-select-->
            <!--                        v-model="linkedAttribute"-->
            <!--                        :items="attributes"-->
            <!--                        label="Аттрибут привязки"-->
            <!--                        value-key="key"-->
            <!--                        @select="onSelectAttribute"-->
            <!--                    />-->
            <!--                </v-card-content>-->
            <!--                <v-card-actions class="">-->
            <!--                </v-card-actions>-->
            <!--            </v-card>-->
        </v-form>
    </v-modal>
</template>
