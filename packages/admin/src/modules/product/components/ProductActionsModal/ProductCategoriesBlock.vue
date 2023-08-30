<script lang="ts" setup>
    import {
        computed,
        unref,
        watch,
    } from 'vue'
    import { useProductsService } from '@modules/product/composables/use-products-service'
    import { useProductCategories } from '@modules/product/composables/use-product-categories'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { ICategory } from '@proshop/types'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { TreeView } from '@shared/components/TreeView'

    const { product } = useProductsService()
    const { toggleCategory, select, categoriesTree, selectsMap } = useProductCategories()

    const productCategories = computed<ICategory[]>(() => unref(product)?.categories as ICategory[])

    watch(productCategories, (items: ICategory[]) => {
        items.forEach((ctg) => select(ctg))
    }, { immediate: true })

</script>
<template>
    <v-row class="pa-4 app-border-radius">
        <v-col cols="12">
            <form-card>
                <template #title>
                    <v-svg
                        viewBox="-30 0 512 512"
                        :path="SvgPaths.DIAGRAM_NESTED"
                    />
                </template>
                <template #body>
                    <tree-view
                        :value="selectsMap"
                        :items="categoriesTree"
                        class="mt-4"
                        @toggle="toggleCategory"
                    />
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
<style lang="scss">
    .categories-group {
        cursor: pointer;

        &__item {
            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                opacity: 0;
                background-color: rgba(0, 0, 0, .05);
                transition: opacity .2s linear;
            }

            &:hover {
                &:before {
                    opacity: 1;
                }
            }
        }
    }
</style>
