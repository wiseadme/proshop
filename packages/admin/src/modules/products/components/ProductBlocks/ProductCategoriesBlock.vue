<script lang="ts" setup>
    import {
        computed,
        onMounted,
        unref,
        watch
    } from 'vue'

    import { useProduct } from '@modules/products/composables/use-product'
    import { useProductCategories } from '@modules/products/composables/use-product-categories'

    import { useTreeView } from '@shared/composables/use-tree-view'

    import { FormCard } from '@shared/components/FormCard'
    import { TreeView } from '@shared/components/TreeView'
    import { VSvg } from '@shared/components/VSvg'

    import type { ICategory } from '@proshop-app/types'

    import { SvgPaths } from '@shared/enums/svg-paths'
    import { clone } from '@shared/helpers'

    const { product } = useProduct()
    const { categories, selectsMap, toggleCategory, select } = useProductCategories()
    const { treeItems, buildTreeItems } = useTreeView()

    const productCategories = computed<ICategory[]>(() => unref(product)?.categories as ICategory[])

    watch(productCategories, (items: ICategory[]) => {
        items?.forEach((ctg) => select(ctg))
    }, { immediate: true })

    onMounted(() => {
        if (unref(categories)) {
            buildTreeItems(clone(unref(categories)))
        }
    })

</script>
<template>
    <v-row class="app-border-radius">
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
                        v-if="treeItems"
                        :value="selectsMap"
                        :items="treeItems"
                        @toggle="toggleCategory"
                    />
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
<style lang="scss" scoped>
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
