<script lang="ts" setup>
    import {
        computed,
        onMounted,
        unref,
        watch,
    } from 'vue'
    import { useProductsService } from '@modules/products/composables/use-products-service'
    import { useProductCategories } from '@modules/products/composables/use-product-categories'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { ICategory } from '@proshop/types'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { TreeView } from '@shared/components/TreeView'
    import { useTreeView } from '@shared/composables/use-tree-view'
    import { clone } from '@shared/helpers'

    const { product, categoryItems } = useProductsService()
    const { toggleCategory, select, selectsMap } = useProductCategories()
    const { treeItems, buildTreeItems } = useTreeView()

    const productCategories = computed<ICategory[]>(() => unref(product)?.categories as ICategory[])

    onMounted(() => buildTreeItems(clone(unref(categoryItems))))

    watch(productCategories, (items: ICategory[]) => {
        items.forEach((ctg) => select(ctg))
    }, { immediate: true })

</script>
<template>
    <v-row class="pa-4 app-border-radius">
        <v-col cols="12">
            <form-card>
                <template #icon>
                    <v-svg
                        viewBox="-30 0 512 512"
                        :path="SvgPaths.DIAGRAM_NESTED"
                    />
                </template>
                <template #title>
                    Категории в которые можно добавить товар
                </template>
                <template #body>
                    <tree-view
                        :value="selectsMap"
                        :items="treeItems"
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
