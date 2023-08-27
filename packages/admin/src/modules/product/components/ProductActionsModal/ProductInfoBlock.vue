<script lang="ts" setup>
    import { ref, watch } from 'vue'
    import { TextEditor } from '@shared/components/TextEditor'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
    import { useProductsService } from '@modules/product/composables/use-products-service'

    const { unitItems } = useProductsService()

    const {
        model,
        hasChanges,
    } = useProduct()

    const { showModal } = useProductActionsModal()

    const textEditorRerenderKey = ref<string>('')

    watch(showModal, state => state && (textEditorRerenderKey.value = Date.now().toString()))
    watch(hasChanges, state => !state && (textEditorRerenderKey.value = Date.now().toString()))

</script>
<template>
    <v-row class="pa-4">
        <v-col xl="6">
            <v-card
                elevation="2"
                style="width: 100%"
                color="white"
                class="app-border-radius"
            >
                <v-card-content>
                    <v-text-field
                        v-model.trim="model.name"
                        label="Наименование товара *"
                        :rules="[val => !!val || 'Обязательное поле']"
                        color="primary"
                    />
                    <v-text-field
                        v-model.number="model.price"
                        label="Цена *"
                        :rules="[val => !!val || 'Обязательное поле']"
                        color="primary"
                        type="number"
                    />
                    <v-text-field
                        v-model.number="model.quantity"
                        label="Количество"
                        type="number"
                        color="primary"
                    />
                    <v-select
                        v-model="model.unit"
                        :items="unitItems"
                        label="Единица измерения"
                        color="primary"
                        value-key="value"
                        active-class="primary white--text"
                        text-color="var(--content)"
                    />
                </v-card-content>
            </v-card>
        </v-col>
        <v-col xl="6">
            <v-card
                elevation="2"
                style="width: 100%"
                color="white"
                class="app-border-radius"
            >
                <v-card-content>
                    <v-text-field
                        v-model="model.seo.title"
                        label="SEO title"
                        color="primary"
                        text-color="content"
                    />
                    <v-text-field
                        v-model="model.seo.description"
                        label="SEO description"
                        color="primary"
                        text-color="content"
                    />
                    <v-text-field
                        v-model="model.seo.keywords"
                        label="SEO keywords"
                        color="primary"
                        text-color="content"
                    />
                    <v-text-field
                        v-model.trim="model.url"
                        label="URL товара"
                        color="primary"
                        text-color="content"
                    />
                </v-card-content>
            </v-card>
        </v-col>
        <v-col class="pt-2">
            <v-card
                elevation="2"
                style="width: 100%"
                color="white"
                class="app-border-radius"
            >
                <v-card-title class="primary--text">
                    <h5>Описание товара *</h5>
                </v-card-title>
                <v-card-content>
                    <text-editor
                        :key="textEditorRerenderKey"
                        v-model:content="model.description"
                        style="height: 300px"
                        content-type="html"
                        :global-options="{
                            placeholder: 'введите описание товара'
                        }"
                    />
                </v-card-content>
            </v-card>
        </v-col>
    </v-row>
</template>
