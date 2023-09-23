<script lang="ts" setup>
    import { computed, unref } from 'vue'
    import { FormCard } from '@shared/components/FormCard'
    import { useCategory } from '@modules/categories/composables/use-category'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'
    import { ICategory } from '@proshop/types'
    import { useCategoryInfo } from '@modules/categories/composables/use-category-info'

    const { model } = useCategory()
    const {
        categories,
    } = useCategoriesService()

    const { onSubmit } = useCategoryInfo()

    const getParent = (): Maybe<ICategory> => unref(categories).find(it => it.id === unref(model).parentId) || null

    const setParent = (category: ICategory) => {
        unref(model).parentId = category.id
    }

    const computedParent = computed<Maybe<ICategory>>({
        get: getParent,
        set: setParent,
    })

</script>
<template>
    <v-form v-slot="{validate}">
        <v-row>
            <v-col cols="6">
                <form-card>
                    <template #title>
                        Основная информация категории
                    </template>
                    <template #body>
                        <v-text-field
                            v-model.trim="model.title"
                            :rules="[val => !!val || 'Обязательное поле']"
                            label="название"
                        />
                        <v-text-field
                            v-model.number="model.order"
                            label="порядковый номер"
                            type="number"
                        />
                        <v-select
                            v-model="computedParent"
                            label="Родительская категория"
                            :items="categories"
                            :disabled="categories && !categories.length"
                            active-class="green white--text text--white"
                            value-key="title"
                        />
                    </template>
                </form-card>
            </v-col>
            <v-col cols="6">
                <form-card>
                    <template #title>
                        Информация для заголовков страницы категории
                    </template>
                    <template #body>
                        <v-text-field
                            v-model.trim="model.url"
                            label="url категории"
                        />
                        <v-text-field
                            v-model.trim="model.seo.title"
                            label="seo title"
                        />
                        <v-text-field
                            v-model.trim="model.seo.description"
                            label="seo description"
                        />
                        <v-text-field
                            v-model.trim="model.seo.keywords"
                            label="seo keywords"
                        />
                    </template>
                </form-card>
            </v-col>
            <v-col>
                <v-card
                    style="width: 100%"
                    color="white"
                    class="app-border-radius mt-2"
                    elevation="2"
                >
                    <v-card-actions>
                        <v-button
                            color="success"
                            class="app-border-radius"
                            elevation="2"
                            width="120"
                            @click="onSubmit(validate)"
                        >
                            сохранить
                        </v-button>
                        <v-button
                            color="secondary"
                            class="ml-2 app-border-radius"
                            width="120"
                            elevation="3"
                        >
                            отменить
                        </v-button>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-form>
</template>
