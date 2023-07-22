<script lang="ts" setup>
    import { useFilterGroups } from '@modules/filter/composables/use-filter-groups'

    const { filterGroups } = useFilterGroups()
</script>
<template>
    <v-list
        class=""
        style="background-color: transparent"
    >
        <v-list-item
            v-for="group in filterGroups"
            :key="group._id"
            class="my-1 mx-1 elevation-1 app-border-radius white"
        >
            <v-list-item-content>
                <v-list-item-title>
                    {{ group.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ group.attributeName }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>
