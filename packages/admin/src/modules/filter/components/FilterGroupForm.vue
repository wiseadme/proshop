<script lang="ts" setup>
    import { useFilterGroups } from '@modules/filter/composables/use-filter-groups'

    const {
        attributes,
        model,
        onCreateGroup,
        onSelectAttribute,
    } = useFilterGroups()

</script>
<template>
    <v-form v-slot="{validate}">
        <v-card
            color="white"
            elevation="2"
            style="width: 100%"
            class="app-border-radius"
        >
            <v-card-title>
                <h3 class="primary--text">
                    Форма создания групп фильтров
                </h3>
            </v-card-title>
            <v-card-content>
                <v-select
                    v-model="model.attributeName"
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
            </v-card-content>
            <v-card-actions>
                <v-button
                    color="primary"
                    class="app-border-radius"
                    width="120"
                    elevation="2"
                    @click="onCreateGroup(validate)"
                >
                    Создать
                </v-button>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
