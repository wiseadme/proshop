<script lang="ts" setup>
    import { unref, watch } from 'vue'
    import { useProduct } from '@modules/product/composables/use-product'
    import { useProductsService } from '@modules/product/composables/use-products-service'
    import { useProductCategories } from '@modules/product/composables/use-product-categories'
    import { useProductActionsModal } from '@modules/product/composables/use-product-actions-modal'
    import { ICategory } from '@proshop/types'

    const { isEditMode, model, hasChanges } = useProduct()
    const { categoryItems } = useProductsService()
    const { categoriesMap, toggleCategory } = useProductCategories()
    const { showModal } = useProductActionsModal()

    /**
     * @description - при открытии модального окна
     * сбрасываем все категории (снимаем все выделения)
     */
    watch(showModal, (state) => state && unref(categoriesMap).clear())

    watch(isEditMode, () => {
        /**
         * @description - в режиме редактирования выделяем
         * все имеющиеся категории продукта
         */
        const categories = unref(model).categories as ICategory[]

        categories.forEach(ctg => {
            if (!unref(categoriesMap).get(ctg.id)) toggleCategory(ctg)
        })
    })

    watch(hasChanges, (state) => {
        if (state) return
        /**
         * @description - сбрасываем все категории и перерисовываем их
         * если сбросили все изменения продукта
         */

        unref(categoriesMap).clear()

        const categories = unref(model).categories as ICategory[]

        categories?.forEach(toggleCategory)
    })

</script>
<template>
    <v-row class="white elevation-2 pa-4 app-border-radius">
        <v-col class="block-head pb-6 mb-8">
            <h2 class="block-head__title">
                Категории
            </h2>
        </v-col>
        <v-col xl="12">
            <template
                v-for="it in categoryItems"
                :key="it.id"
            >
                <v-group
                    v-if="it.children && it.children.length"
                    :title="it.title"
                    class="elevation-2"
                    :expand="isEditMode"
                >
                    <v-list>
                        <v-list-item
                            v-for="(child) in it.children as ICategory[]"
                            :key="child.id"
                            :class="[{'primary white--text text--base': categoriesMap.get(child.id)}]"
                            @click="toggleCategory(child as ICategory)"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-group>
                <v-list
                    v-else-if="!it.parent && !it.children || it.children && !it.children.length"
                    class="elevation-2"
                >
                    <v-list-item
                        :class="[{'primary white--text text--base': categoriesMap.get(it.id)}]"
                        @click="toggleCategory(it)"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ it.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-col>
    </v-row>
</template>
