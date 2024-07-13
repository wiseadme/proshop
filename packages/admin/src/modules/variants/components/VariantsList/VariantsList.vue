<script lang="ts" setup>
    import { onBeforeMount, unref } from 'vue'

    import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
    import { useVariant } from '@modules/variants/composables/use-variant'
    import { useVariantsService } from '@modules/variants/composables/use-variants-service'

    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'


    import { Variant } from '@modules/variants/model/variant.model'

    import type { IVariant } from '@proshop/types'

    import { SvgPaths } from '@shared/enums/svg-paths'

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
                    {{ (item as IVariant).name }}
                </template>
                <template #tooltip="{item}">
                    {{ (item as IVariant).name }}
                </template>
            </draggable-items-list>
        </template>
    </form-card>
</template>
