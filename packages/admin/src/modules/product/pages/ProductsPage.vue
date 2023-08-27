<script lang="ts" setup>
    // import { unref, watch } from 'vue'
    // Components
    import { ProductActionsModal } from '@modules/product/components/ProductActionsModal'
    import { ProductTable } from '@modules/product/components/ProductTable'
    import SkeletonPreloader from '@shared/components/Preloader/SkeletonPreloader.vue'
    // Types
    import { useProduct } from '@modules/product/composables/use-product'

    const {
        // model,
        // hasChanges,
        // isEditMode,
        isLoading,
        // getProductUpdates,
        onInit,
    } = useProduct()

    // let stopWatching
    //
    // const startWatching = () => watch(model, () => {
    //     if (!unref(isEditMode) || unref(hasChanges)) return
    //
    //     hasChanges.value = !!getProductUpdates()
    // }, { deep: true })

    /**
     * @description запускаем watch за изменениями продукта,
     * только если он в режиме редактирования
     */
    // watch(isEditMode, (state) => {
    //     state ? (stopWatching = startWatching()) : stopWatching()
    // })

    onInit()

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col cols="12">
                <skeleton-preloader v-if="isLoading"/>
                <product-table v-else/>
            </v-col>
        </v-row>
        <product-actions-modal/>
    </v-layout>
</template>
