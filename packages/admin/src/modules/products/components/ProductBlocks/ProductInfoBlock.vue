<script lang="ts" setup>
    import { ref } from 'vue'
    import { TextEditor } from '@shared/components/TextEditor'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { useProductModel } from '@modules/products/composables/use-product-model'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useProductInfo } from '@modules/products/composables/use-product-info'

    const { unitItems } = useProductsService()
    const { model } = useProductModel()
    const { onSubmit } = useProductInfo()

    const renderKey = ref<number>(0)
</script>
<template>
    <v-row>
        <v-col
            class="mb-4"
            xl="6"
            lg="6"
            md="6"
            sm="12"
        >
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
                </template>
            </form-card>
        </v-col>
        <v-col
            class="mb-4"
            xl="6"
            lg="6"
            md="6"
            sm="12"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.SHARE_NODES"/>
                </template>
                <template #title>
                    Информация для заголовков страницы
                </template>
                <template #body>
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
                </template>
            </form-card>
        </v-col>
        <v-col
            class="mb-4"
            xl="12"
            lg="12"
            md="12"
            sm="12"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.NEWSPAPER"/>
                </template>
                <template #title>
                    Более детальное описание товара
                </template>
                <template #body>
                    <text-editor
                        :key="renderKey"
                        v-model:content="model.description"
                        style="height: 300px"
                        data-test="description-area"
                        content-type="html"
                        :global-options="{
                            placeholder: 'введите описание товара'
                        }"
                    />
                </template>
                <template #actions>
                    <v-button
                        color="success"
                        class="mr-2 app-border-radius"
                        elevation="2"
                        width="110"
                        @click="onSubmit"
                    >
                        Сохранить
                    </v-button>
                    <v-button
                        color="secondary"
                        class="app-border-radius"
                        elevation="2"
                        width="110"
                    >
                        Отменить
                    </v-button>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
