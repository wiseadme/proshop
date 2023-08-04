<script lang="ts" setup>
    import { ref, unref } from 'vue'
    import { useVariantsService } from '@modules/variant/composables/use-variants-service'
    import { Variant } from '@modules/variant/model/variant.model'
    import ItemsList from '@shared/components/ItemsList'
    import { IVariant } from '@proshop/types'

    const { getVariants, createVariant, deleteVariant, variants } = useVariantsService()

    const model = ref<IVariant>(Variant.create())

    const onCreate = (validate) => {
        validate()
            .then(() => createVariant(unref(model)))
            .then(clearForm)
    }

    const onDelete = (item) => {
        return deleteVariant(item.id)
    }

    const clearForm = () => {
        model.value = Variant.create()
    }

    getVariants()
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
                            <h3>Группы вариантов</h3>
                        </v-card-title>
                        <v-card-content>
                            <v-text-field
                                v-model.trim="model.group"
                                label="Название группы"
                                color="content"
                                :rules="[val => !!val || 'Обязательное поле']"
                            />
                        </v-card-content>
                        <v-card-actions class="">
                            <v-button
                                elevation="2"
                                color="primary"
                                class="app-border-radius"
                                width="120"
                                @click="onCreate(validate)"
                            >
                                Сохранить
                            </v-button>
                            <v-button
                                elevation="2"
                                color="warning"
                                class="ml-2 app-border-radius"
                                width="120"
                                rounded
                                @click="clearForm"
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
                <template v-if="variants">
                    <items-list
                        :items="variants"
                        @delete="onDelete"
                    >
                        <template #title="{item}">
                            <span>{{ item.group }}</span>
                        </template>
                    </items-list>
                </template>
            </v-col>
        </v-row>
    </v-layout>
</template>
<style lang="scss">
    .variant-item {
        min-height: 50px;
    }
</style>
