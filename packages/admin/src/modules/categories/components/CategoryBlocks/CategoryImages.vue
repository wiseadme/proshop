<script lang="ts" setup>
    import { ref, unref } from 'vue'
    import { FormCard } from '@shared/components/FormCard'
    import { useCategory } from '@modules/categories/composables/use-category'
    import { useCategoriesService } from '@modules/categories/composables/use-categories-service'

    const { isEditMode, model, onDeleteCategoryImage, onUploadCategoryImage } = useCategory()
    const {} = useCategoriesService()

    const files = ref<File[]>([])

    const onDeleteImage = () => onDeleteCategoryImage(unref(model).image!)

    const onLoadImage = ([file]) => {
        if (!file) return

        onUploadCategoryImage(file)
        files.value = []
    }
</script>
<template>
    <v-row>
        <v-col
            cols="8"
            offset="2"
        >
            <form-card>
                <template #title>
                    Изображения категории
                </template>
                <template #body>
                    <v-file-input
                        v-model:value="files"
                        label="загрузите изображения"
                        chip-color="green"
                        :disabled="!isEditMode"
                        @update:value="onLoadImage"
                        @delete="onDeleteImage"
                    />
                </template>
            </form-card>
        </v-col>
        <v-col
            cols="8"
            offset="2"
        >
            <div
                v-for="it in model.assets"
                :key="it.id"
            >
                <v-img :src="it.url"/>
            </div>
        </v-col>
    </v-row>
</template>
