<script lang="ts" setup>
    import { ref } from 'vue'
    import { TextEditor } from '@shared/components/TextEditor'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useProductsService } from '@modules/product/composables/use-products-service'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { unitItems } = useProductsService()
    const { model } = useProduct()

    const textEditorRerenderKey = ref<string>('')

</script>
<template>
    <v-row class="pa-4">
        <v-col xl="6">
            <form-card>
                <template #title>
                    <v-svg
                        viewBox="-55 0 512 512"
                        :path="SvgPaths.FILE_LINES"
                    />
                </template>
                <template #body>
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
                </template>
            </form-card>
        </v-col>
        <v-col xl="6">
            <form-card>
                <template #title>
                    <v-svg
                        :path="SvgPaths.SHARE_NODES"
                        width="35"
                    />
                </template>
                <template #body>
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
                </template>
            </form-card>
        </v-col>
        <v-col class="pt-4">
            <form-card>
                <template #title>
                    <v-svg :path="SvgPaths.NEWSPAPER"/>
                </template>
                <template #body>
                    <text-editor
                        :key="textEditorRerenderKey"
                        v-model:content="model.description"
                        style="height: 300px"
                        content-type="html"
                        :global-options="{
                            placeholder: 'введите описание товара'
                        }"
                    />
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
