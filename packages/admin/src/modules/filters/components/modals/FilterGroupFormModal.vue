<script lang="ts" setup>
    import { useFilterGroups } from '@modules/filters/composables/view/use-filter-groups'

    import { ModalCard } from '@shared/components/Modals'

    const {
        model,
        attributes,
        showGroupForm,
        linkedAttribute,
        onSubmit,
        onSelectAttribute,
    } = useFilterGroups()

</script>
<template>
    <v-modal
        v-model="showGroupForm"
        transition="scale-in"
        overlay
    >
        <v-form v-slot="{validate}">
            <modal-card @close="showGroupForm = false">
                <template #title>
                    Форма создания групп фильтров
                </template>
                <template #content>
                    <v-select
                        v-model="linkedAttribute"
                        label="Аттрибут привязки *"
                        :items="attributes"
                        :rules="[v => !!v || 'Обязательное поле']"
                        value-key="key"
                        @select="onSelectAttribute"
                    />
                    <v-text-field
                        v-model="model.name"
                        label="Название группы фильтров *"
                        :rules="[v => !!v || 'Обязательное поле']"
                    />
                </template>
                <template #actions>
                    <v-button
                        color="success"
                        class="app-border-radius"
                        width="120"
                        elevation="2"
                        @click="onSubmit(validate)"
                    >
                        Создать
                    </v-button>
                </template>
            </modal-card>
        </v-form>
    </v-modal>
</template>
