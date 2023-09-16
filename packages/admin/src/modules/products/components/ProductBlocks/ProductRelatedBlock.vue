<script lang="ts" setup>
    import FormCard from '@shared/components/FormCard/FormCard.vue'
    import VSvg from '@shared/components/VSvg/VSvg.vue'
    import ItemsList from '@shared/components/ItemsList/ItemsList.vue'

    import { useProductRelated } from '@modules/products/composables/use-product-related'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const {
        related,
        searchedItems,
        relatedProduct,
        onSearchInput,
        onSelectSearched,
        onAddToRelated,
        onDeleteRelated,
    } = useProductRelated()


</script>
<template>
    <v-layout column>
        <v-row>
            <v-col
                cols="8"
                offset="2"
            >
                <form-card>
                    <template #icon>
                        <v-svg :path="SvgPaths.NEWSPAPER"/>
                    </template>
                    <template #title>
                        Рекомендуемые товары
                    </template>
                    <template #body>
                        <div class="input-wrapper d-flex align-center justify-start">
                            <v-autocomplete
                                v-model="relatedProduct"
                                label="Поиск товаров"
                                :items="searchedItems"
                                value-key="name"
                                prepend-icon="fas fa-search"
                                color="primary"
                                typeable
                                clearable
                                @input="onSearchInput"
                                @select="onSelectSearched"
                            />
                            <v-button
                                class="ml-2 app-border-radius"
                                width="120"
                                height="48"
                                :disabled="!relatedProduct"
                                color="success"
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
