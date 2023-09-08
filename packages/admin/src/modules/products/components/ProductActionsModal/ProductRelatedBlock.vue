<script lang="ts" setup>
    import {
        computed,
        ref,
        unref
    } from 'vue'
    import { IProduct } from '@proshop/types'
    import { useProductRelated } from '@modules/products/composables/use-product-related'
    import { useProduct } from '@modules/products/composables/use-product'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import FormCard from '@shared/components/FormCard/FormCard.vue'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import ItemsList from '@shared/components/ItemsList/ItemsList.vue'

    const { model, onUpdateProduct } = useProduct()
    // const { related } = useProductRelated()
    const { getProducts } = useProductsService()

    const products = ref<IProduct[]>([])
    const relatedProduct = ref<Maybe<IProduct>>(null)

    const related = computed(() => unref(model).related)

    const onInput = async (val: string) => {
        products.value = await getProducts({ name: val })
    }

    const onSelect = (product: IProduct) => {
        relatedProduct.value = product
    }

    const onAddToRelated = () => {
        unref(model).related.push(unref(relatedProduct) as any)
        relatedProduct.value = null
        // onUpdateProduct()
    }

    const onDeleteRelated = (item) => {
        unref(model).related = (unref(model).related as any).filter(it => it.id !== item.id)
        // onUpdateProduct()
    }

</script>
<template>
    <v-layout
        class="pa-4"
        column
    >
        <v-row>
            <v-col cols="8">
                <form-card>
                    <template #icon>
                        <v-svg :path="SvgPaths.NEWSPAPER"/>
                    </template>
                    <template #body>
                        <div class="input-wrapper d-flex align-center justify-start">
                            <v-autocomplete
                                v-model="relatedProduct"
                                label="Поиск товаров"
                                :items="products"
                                value-key="name"
                                prepend-icon="fas fa-search"
                                color="primary"
                                typeable
                                clearable
                                @input="onInput"
                                @select="onSelect"
                            />
                            <v-button
                                class="ml-2 app-border-radius"
                                width="120"
                                height="48"
                                :disabled="!relatedProduct"
                                color="primary"
                                elevation="2"
                                tabindex="1"
                                @click="onAddToRelated"
                            >
                                добавить
                            </v-button>
                        </div>
                        <items-list
                            :items="related"
                            :editable="false"
                            @delete="onDeleteRelated"
                        >
                            <template #title="{item}">
                                {{ item.name }}
                            </template>
                        </items-list>
                    </template>
                </form-card>
            </v-col>
        </v-row>
    </v-layout>
</template>
