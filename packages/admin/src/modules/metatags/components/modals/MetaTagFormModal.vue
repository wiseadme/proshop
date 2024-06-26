<script lang="ts" setup>
    // Composables
    import { computed, unref } from 'vue'

    import { useMetaTag } from '@modules/metatags/composables/use-meta-tag'
    import { useMetaTagForm } from '@modules/metatags/composables/use-meta-tag-form'

    // Components
    import { ModalCard } from '@shared/components/Modals'
    import { VSvg } from '@shared/components/VSvg'

    // Types
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { descriptorToMetaTag } from '@shared/helpers/metatag'

    const {
        showFormModal,
        metaProp,
        clearMetaProp,
    } = useMetaTagForm()

    const {
        model,
        isEditMode,
        clearAll,
        onSaveMetaTag
    } = useMetaTag()

    const saveBtnTitle = computed(() => unref(isEditMode) ? 'Изменить' : 'Сохранить')
    const displayMeta = computed(() => descriptorToMetaTag(unref(model).props))
    const isDescriptorHasKeys = computed(() => Object.keys(unref(model).props).length)

    const addPropsToMeta = async (validate: () => Promise<boolean>) => {
        await validate()

        const key = unref(metaProp).key.toLowerCase()
        unref(model).props[key] = unref(metaProp).value

        clearMetaProp()
    }

</script>
<template>
    <v-modal
        v-model="showFormModal"
        width="600"
        overlay
        transition="scale-in"
    >
        <v-form v-slot="{validate}">
            <modal-card @close="showFormModal = false">
                <template #icon>
                    <v-svg :path="SvgPaths.SHARE_NODES"/>
                </template>
                <template #title>
                    Форма генерации метатегов
                </template>
                <template #content>
                    <v-text-field
                        v-model="metaProp.key"
                        :rules="[val => !!val || 'Обязательное поле']"
                        label="Ключ"
                    />
                    <v-text-field
                        v-model="metaProp.value"
                        label="Значение по умолчанию"
                    />
                    <div class="py-8">
                        <code>
                            {{ displayMeta }}
                        </code>
                    </div>
                    <v-text-field
                        v-model="model.order"
                        type="number"
                        label="Порядковый номер мета тега"
                    />
                </template>
                <template #actions>
                    <v-button
                        color="var(--primary)"
                        class="mr-2 app-border-radius"
                        width="120"
                        elevation="2"
                        @click="addPropsToMeta(validate)"
                    >
                        Добавить ключ
                    </v-button>
                    <v-button
                        color="var(--warning)"
                        class="mr-2 app-border-radius"
                        width="120"
                        elevation="2"
                        @click="clearAll"
                    >
                        Сбросить
                    </v-button>
                    <v-button
                        color="success"
                        class="app-border-radius"
                        width="120"
                        elevation="2"
                        :disabled="!isDescriptorHasKeys"
                        @click="onSaveMetaTag"
                    >
                        {{ saveBtnTitle }}
                    </v-button>
                </template>
            </modal-card>
        </v-form>
    </v-modal>
</template>
