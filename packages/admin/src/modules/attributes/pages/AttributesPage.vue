<script lang="ts" setup>
    import { ref, unref } from 'vue'
    import { DraggableItemsList } from '@shared/components/DraggableItemsList'
    import { Attribute } from '@modules/attributes/model/attribute.model'
    // Composables
    import { useAttributesService } from '@modules/attributes/composables/use-attributes-service'
    // Types
    import { IAttribute } from '@proshop/types'

    const {
        attributes,
        updateAttribute,
        deleteAttribute,
        createAttribute,
        getAttributes,
    } = useAttributesService()

    const attributePattern = ref<IAttribute>(Attribute.create())

    const clearForm = () => {
        attributePattern.value = Attribute.create()
    }

    const onCreate = (validate) => {
        validate().then(() => createAttribute(unref(attributePattern)))
    }

    const onChange = () => {
        unref(attributes)!.forEach((it, i) => it.order = i)
        updateAttribute(unref(attributes))
    }

    const onDelete = (attribute: IAttribute) => {
        deleteAttribute(attribute.id)
    }

    getAttributes()

</script>
<template>
    <v-layout column>
        <v-row>
            <v-col
                xl="4"
                lg="6"
                md="12"
                sm="12"
            >
                <v-form v-slot="{validate}">
                    <v-card
                        width="100%"
                        elevation="2"
                        color="white"
                        class="app-border-radius"
                    >
                        <v-card-title class="primary--text">
                            <h3>Аттрибуты</h3>
                        </v-card-title>
                        <v-card-content>
                            <v-text-field
                                v-model="attributePattern.key"
                                label="Название*"
                                :rules="[val => !!val || 'Обязательное поле']"
                            />
                            <v-text-field
                                v-model="attributePattern.value"
                                label="Значение по умолчанию*"
                                :rules="[val => !!val || 'Обязательное поле']"
                            />
                            <v-text-field
                                v-model="attributePattern.meta"
                                label="Мета информация"
                            />
                            <v-text-field
                                v-model="attributePattern.order"
                                label="Порядковый номер"
                                type="number"
                            />
                        </v-card-content>
                        <v-card-actions class="">
                            <v-button
                                elevation="2"
                                color="primary"
                                class="app-border-radius"
                                width="120"
                                rounded
                                @click="onCreate(validate)"
                            >
                                Сохранить
                            </v-button>
                            <v-button
                                elevation="2"
                                color="warning"
                                class="ml-2 app-border-radius"
                                width="120"
                                @click="clearForm"
                            >
                                Очистить
                            </v-button>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
            <v-col
                xl="8"
                lg="6"
                md="12"
                sm="12"
            >
                <template v-if="attributes">
                    <draggable-items-list
                        v-model="attributes"
                        editable
                        deletable
                        :items="attributes"
                        @delete="onDelete"
                        @change="onChange"
                    >
                        <template #title="{item}">
                            {{ item.key }}
                        </template>
                        <template #tooltip="{item}">
                            {{ item.key }}: {{ item.value }}
                        </template>
                    </draggable-items-list>
                </template>
            </v-col>
        </v-row>
    </v-layout>
</template>
<style lang="scss">
    @import "./AttributePage";
</style>
