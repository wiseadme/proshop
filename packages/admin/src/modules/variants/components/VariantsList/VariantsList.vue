<script lang="ts" setup>
    import { onBeforeMount, unref } from 'vue'
    import { useVariantsService } from '@modules/variants/composables/use-variants-service'
    import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
    import { useVariant } from '@modules/variants/composables/use-variant'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { Variant } from '@modules/variants/model/variant.model'
    import type { IVariant } from '@proshop/types'

    const {
        variants,
        getVariants,
        deleteVariant,
    } = useVariantsService()

    const {
        model,
        isEditMode,
        linkedAttribute,
        showVariantForm
    } = useVariant()

    const {
        attributes,
        getAttributes,
    } = useAttributesService()

    const onDelete = (item: IVariant) => deleteVariant(item.id)

    const onEdit = (item: IVariant) => {
        isEditMode.value = true
        showVariantForm.value = true
        model.value = Variant.create(item)
        linkedAttribute.value = unref(attributes).find(attr => attr.id === item.attributeId)!
    }

    const onChange = () => {}

    onBeforeMount(() => {
        getVariants()
        getAttributes()
    })
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #title>
            Список вариантов
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="showVariantForm = true"
            >
                Добавить
            </v-button>
        </template>
        <template #body>
            <draggable-items-list
                v-model="variants"
                :items="variants"
                editable
                deletable
                @delete="onDelete"
                @change="onChange"
                @edit="onEdit"
            >
                <template #title="{item}">
                    {{ (item as IVariant).group }}
                </template>
                <template #tooltip="{item}">
                    {{ (item as IVariant).group }}
                </template>
            </draggable-items-list>
        </template>
    </form-card>
</template>
