<script lang="ts" setup>
    import { inject } from 'vue'

    import { useProductInfo } from '@modules/products/composables/use-product-info'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductsService } from '@modules/products/composables/use-products-service'

    import { useButtonsPanel } from '@shared/composables/use-buttons-panel'

    import { FormCard } from '@shared/components/FormCard'
    import { TextEditor } from '@shared/components/TextEditor'
    import { VSvg } from '@shared/components/VSvg'

    import { SvgPaths } from '@shared/enums/svg-paths'

    const { unitItems } = useProductsService()
    const { model } = useProductModel()
    const { textEditorKey, onSubmit, onDismiss } = useProductInfo()

    const form = inject('$v_form', {}) as any

    useButtonsPanel({
        title: 'Основная информация',
        onOk: () => onSubmit(form.validate),
        onDismiss
    })

</script>
<template>
    <v-row>
        <v-col class="mb-4">
            <form-card>
                <template #icon>
                    <v-svg
                        viewBox="-55 0 512 512"
                        :path="SvgPaths.FILE_LINES"
                    />
                </template>
                <template #title>
                    Форма заполнения основной информации
                </template>
                <template #body>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model.trim="model.name"
                                label="Наименование товара *"
                                data-test="name-input"
                                :rules="[() => !!model.name || 'Обязательное поле']"
                            />
                            <v-text-field
                                v-model.number="model.price"
                                label="Цена *"
                                data-test="price-input"
                                :rules="[() => !!model.price || 'Обязательное поле']"
                                type="number"
                            />
                            <v-text-field
                                v-model.number="model.quantity"
                                label="Количество"
                                data-test="quantity-input"
                                type="number"
                            />
                            <v-select
                                v-model="model.unit"
                                :items="unitItems"
                                label="Единица измерения"
                                data-test="unit-input"
                                value-key="value"
                                active-class="primary white--text"
                                text-color="var(--content)"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="model.seo.title"
                                label="SEO title"
                                data-test="seo-title-input"
                                text-color="content"
                            />
                            <v-text-field
                                v-model="model.seo.description"
                                label="SEO description"
                                data-test="seo-desc-input"
                                text-color="content"
                            />
                            <v-text-field
                                v-model="model.seo.keywords"
                                label="SEO keywords"
                                data-test="seo-keywords-input"
                                text-color="content"
                            />
                            <v-text-field
                                v-model.trim="model.url"
                                label="URL товара"
                                data-test="url-input"
                                text-color="content"
                            />
                        </v-col>
                        <v-col>
                            <text-editor
                                :key="textEditorKey"
                                v-model:content="model.description"
                                style="height: 300px"
                                data-test="description-area"
                                content-type="html"
                                :global-options="{
                                    placeholder: 'введите описание товара'
                                }"
                            />
                        </v-col>
                    </v-row>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
<style lang="scss">
</style>
