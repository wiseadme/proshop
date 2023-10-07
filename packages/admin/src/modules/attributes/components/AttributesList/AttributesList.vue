<script lang="ts" setup>
    import { onMounted, unref } from 'vue'
    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'
    import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
    import { IAttribute } from '@proshop/types'
    import { SvgPaths } from '@shared/enums/svg-paths'
    import { useAttributeForm } from '@modules/attributes/composables/use-attribute-form'
    import { useAttributeModel } from '@modules/attributes/composables/use-attribute-model'

    const {
        attributes,
        updateAttribute,
        deleteAttribute,
        getAttributes,
    } = useAttributesService()

    const { isFormVisible } = useAttributeForm()
    const { setAttributeModel } = useAttributeModel()

    const onChange = () => {
        unref(attributes)!.forEach((it, i) => it.order = i)
        updateAttribute(unref(attributes))
    }

    const onDelete = (attribute: IAttribute) => {
        deleteAttribute(attribute.id)
    }

    const onEdit = (attr: IAttribute) => {
        setAttributeModel(attr)
        isFormVisible.value = true
    }

    onMounted(() => {
        getAttributes()
    })
</script>
<template>
    <form-card>
        <template #icon>
            <v-svg :path="SvgPaths.LIST"/>
        </template>
        <template #title>
            Список атрибутов
        </template>
        <template #header>
            <v-button
                class="app-border-radius"
                elevation="2"
                color="success"
                width="120"
                @click="isFormVisible = true"
            >
                Добавить
            </v-button>
        </template>
        <template #body>
            <draggable-items-list
                v-model="attributes"
                editable
                deletable
                :items="attributes"
                @delete="onDelete"
                @change="onChange"
                @edit="onEdit"
            >
                <template #title="{item}">
                    {{ item.key }}
                </template>
                <template #tooltip="{item}">
                    {{ item.key }}: {{ item.value }}
                </template>
            </draggable-items-list>
        </template>
    </form-card>
</template>
