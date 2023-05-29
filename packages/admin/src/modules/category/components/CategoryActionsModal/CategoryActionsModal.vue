<script lang="ts" setup>
    import {
        computed,
        ref,
        unref,
        watch
    } from 'vue'
    import { ICategory } from '@proshop/types'
    import { useCategoriesService } from '@modules/category/composables/use-categories-service'
    import { useCategory } from '@modules/category/composables/use-category'
    import { useCategoryActionsModal } from '@modules/category/composables/use-category-actions-modal'
    import { CREATE_CATEGORY_TITLE, EDIT_CATEGORY_TITLE } from '@modules/category/constants'

    const { categories } = useCategoriesService()
    const { showModal, closeActionsModal } = useCategoryActionsModal()
    const {
        model,
        isEditMode,
        onCreateCategory,
        onUpdateCategory,
        onDeleteCategoryImage,
        onUploadCategoryImage
    } = useCategory()

    const files = ref<File[]>([])

    const modalHeader = computed<string>(() => unref(isEditMode) ? EDIT_CATEGORY_TITLE : CREATE_CATEGORY_TITLE)

    const getParent = () => {
        const id = unref(isEditMode) ? (unref(model).parent as ICategory)?._id : unref(model).parent

        return unref(model).parent ? unref(categories).find(it => it._id === id)! : null
    }

    const setParent = (val: ICategory) => {
        unref(model).parent = unref(isEditMode) ? val : val!._id
    }

    const computedParent = computed<Maybe<ICategory>>({
        get: getParent,
        set: setParent
    })

    const createCategory = (validate) => {
        validate().then(() => onCreateCategory())
    }

    const updateCategory = (validate) => {
        validate()
            .then(() => onUpdateCategory())
            .then(() => files.value = [])
    }

    const onSubmit = validate => {
        if (!unref(isEditMode)) {
            createCategory(validate)
        } else {
            updateCategory(validate)
        }
    }

    const onDeleteImage = () => onDeleteCategoryImage(unref(model).image)

    const onLoadImage = ([file]) => {
        if (!file) {
            return
        }
        onUploadCategoryImage(file)
        files.value = []
    }

    watch(() => unref(model).image, () => files.value = [])
</script>
<template>
    <v-modal
        v-model="showModal"
        transition="scale-in"
        width="700px"
        overlay
        color="white"
    >
        <v-form v-slot="{ validate }">
            <v-card
                class="modal-card app-border-radius elevation-3"
                width="100%"
                color="white"
            >
                <v-card-title class="modal-card-title secondary--text py-4">
                    {{ modalHeader }}
                </v-card-title>
                <v-card-content
                    style="height: 70vh; max-height: 70vh; overflow: auto"
                >
                    <v-row class="y-2 py-2">
                        <v-col
                            xl="12"
                            md="12"
                        >
                            <v-text-field
                                v-model.trim="model.title"
                                label="название"
                            />
                        </v-col>
                        <v-col
                            xl="12"
                            md="12"
                        >
                            <v-text-field
                                v-model.trim="model.url"
                                label="url категории"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="my-2 py-2">
                        <v-col xl="12">
                            <v-text-field
                                v-model.trim="model.seo.title"
                                label="seo title"
                            />
                        </v-col>
                        <v-col
                            xl="12"
                            md="12"
                        >
                            <v-text-field
                                v-model.trim="model.seo.description"
                                label="seo description"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="my-2 py-2">
                        <v-col
                            xl="12"
                            md="12"
                        >
                            <v-text-field
                                v-model.trim="model.seo.keywords"
                                label="seo keywords"
                            />
                        </v-col>
                        <v-col
                            xl="12"
                            md="12"
                        >
                            <v-text-field
                                v-model.number="model.order"
                                label="порядковый номер"
                                type="number"
                            />
                        </v-col>
                        <v-col
                            xl="12"
                            md="12"
                        >
                            <v-select
                                v-model="computedParent"
                                label="Родительская категория"
                                :items="categories"
                                :disabled="categories && !categories.length"
                                active-class="green white--text text--white"
                                value-key="title"
                            />
                        </v-col>
                        <v-col xl="12">
                            <v-file-input
                                v-model:value="files"
                                label="загрузите изображения"
                                chip-color="green"
                                :disabled="!isEditMode || !!model.image"
                                @update:value="onLoadImage"
                                @delete="onDeleteImage"
                            />
                        </v-col>
                    </v-row>
                    <v-row
                        v-if="model.image"
                        class="my-2 py-2"
                    >
                        <v-col
                            xl="12"
                            md="12"
                        >
                            <v-card
                                color="white"
                                width="200"
                                style="position: relative"
                                class="elevation-2"
                            >
                                <v-icon
                                    style="position: absolute; right: 10px; top: 10px"
                                    color="#272727"
                                    clickable
                                    @click="onDeleteImage"
                                >
                                    fas fa-times
                                </v-icon>
                                <v-card-content>
                                    <img
                                        style="width:100%"
                                        :src="model.image"
                                    >
                                </v-card-content>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-checkbox
                                v-model="model.conditions.visible"
                                label="Категория отображаемая"
                            />
                            <v-checkbox
                                v-model="model.conditions.special"
                                class="ml-2"
                                label="Категория специальная"
                            />
                        </v-col>
                    </v-row>
                </v-card-content>
                <v-card-actions>
                    <v-button
                        color="primary"
                        elevation="3"
                        width="120"
                        rounded
                        @click="onSubmit(validate)"
                    >
                        сохранить
                    </v-button>
                    <v-button
                        color="warning"
                        class="ml-2"
                        width="120"
                        elevation="3"
                        rounded
                        @click="closeActionsModal"
                    >
                        отмена
                    </v-button>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-modal>
</template>
<style lang="scss">
</style>
