<script lang="ts" setup>
    import { useFilterGroups } from '@modules/filters/composables/use-filter-groups'
    import { ModalCard } from '@shared/components/Modals'

    const {
        attributes,
        model,
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
            <modal-card>
                <template #title>
                    Форма создания групп фильтров
                </template>
                <template #header>
                    <v-button
                        round
                        color="grey lighten-1"
                        elevation="2"
                        @click="showGroupForm = false"
                    >
                        <v-icon>fas fa-times</v-icon>
                    </v-button>
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
