<script lang="ts" setup>
    import {
        computed,
        ref,
        unref,
        watch,
    } from 'vue'
    import { useProductsService } from '@modules/product/composables/use-products-service'
    import { useProductCategories } from '@modules/product/composables/use-product-categories'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { ICategory } from '@proshop/types'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { NestedList } from '@shared/components/NestedList'

    const { categoryItems, product } = useProductsService()
    const { toggleCategory, select } = useProductCategories()

    const selected = ref<number[]>([])

    const categories = computed<ICategory[]>(() => unref(categoryItems)?.filter(it => !it.children?.length) || [])
    const productCategories = computed<ICategory[]>(() => unref(product)?.categories as ICategory[])

    watch(productCategories, (items: ICategory[]) => {
        /**
         * @description - в режиме редактирования выделяем
         * все имеющиеся категории продукта
         */

        selected.value = []

        items.forEach((ctg) => select(ctg))

    }, { immediate: true })

    watch(selected, (items) => {
        console.log(items)
        items.forEach((it) => toggleCategory(unref(categories)[it]))
    })

</script>
<template>
    <v-row class="pa-4 app-border-radius">
        <v-col cols="6">
            <form-card>
                <template #title>
                    <v-svg
                        viewBox="-30 0 512 512"
                        :path="SvgPaths.DIAGRAM_NESTED"
                    />
                </template>
                <template #body>
                    <nested-list
                        v-model="selected"
                        :items="categoryItems"
                    />
                </template>
            </form-card>
            <!--            <form-card>-->
            <!--                <template #title>-->
            <!--                    <v-svg-->
            <!--                        viewBox="-30 0 512 512"-->
            <!--                        :path="SvgPaths.DIAGRAM_NESTED"-->
            <!--                    />-->
            <!--                </template>-->
            <!--                <template #body>-->
            <!--                    <v-list-->
            <!--                        v-model:value="selected"-->
            <!--                        active-->
            <!--                        multiple-->
            <!--                        class="px-2"-->
            <!--                    >-->
            <!--                        <template-->
            <!--                            v-for="it in categoryItems"-->
            <!--                            :key="it.id"-->
            <!--                        >-->
            <!--                            <v-list-item-->
            <!--                                v-if="!it.children?.length && !it.parent"-->
            <!--                                v-slot="{active}"-->
            <!--                                class="elevation-1 my-1 app-border-radius"-->
            <!--                            >-->
            <!--                                <v-list-item-icon>-->
            <!--                                    <v-icon :icon=" active.value ? 'far fa-check-square' : 'far fa-square'"/>-->
            <!--                                </v-list-item-icon>-->
            <!--                                <v-list-item-content>-->
            <!--                                    <v-list-item-title>-->
            <!--                                        {{ it.title }}-->
            <!--                                    </v-list-item-title>-->
            <!--                                    <v-list-item-subtitle v-if="it.parent">-->
            <!--                                        {{ it.parent!.title }}-->
            <!--                                    </v-list-item-subtitle>-->
            <!--                                </v-list-item-content>-->
            <!--                            </v-list-item>-->
            <!--                            <v-group-->
            <!--                                v-else-if="!it.parent && it.children?.length"-->
            <!--                                prepend-icon="fas fa-list"-->
            <!--                                class="elevation-1 app-border-radius my-1 categories-group"-->
            <!--                            >-->
            <!--                                <template #header>-->
            <!--                                    {{ it.title }}-->
            <!--                                </template>-->
            <!--                                <v-list-item-->
            <!--                                    v-for="child in it.children"-->
            <!--                                    v-slot="{active}"-->
            <!--                                    :key="child.id"-->
            <!--                                    class="categories-group__item"-->
            <!--                                >-->
            <!--                                    <v-list-item-icon>-->
            <!--                                        <v-icon :icon=" active.value ? 'far fa-check-square' : 'far fa-square'"/>-->
            <!--                                    </v-list-item-icon>-->
            <!--                                    <v-list-item-title>-->
            <!--                                        {{ child.title }}-->
            <!--                                    </v-list-item-title>-->
            <!--                                </v-list-item>-->
            <!--                            </v-group>-->
            <!--                        </template>-->
            <!--                    </v-list>-->
            <!--                </template>-->
            <!--            </form-card>-->
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
