<script lang="ts" setup generic="T">
    const { uniqueKey = 'id', deletable = true } = defineProps<{
        items: T[]
        uniqueKey?: string
        deletable?: boolean
    }>()

    defineEmits<{
        (e: 'delete', value: T): void
    }>()
</script>
<template>
    <v-list
        class=""
        style="background-color: transparent"
    >
        <v-list-item
            v-for="item in items"
            :key="item[uniqueKey]"
            class="my-1 mx-1 elevation-1 app-border-radius white"
        >
            <v-list-item-content>
                <v-list-item-title>
                    <slot
                        name="title"
                        :item="item"
                    >
                    </slot>
                </v-list-item-title>
                <v-list-item-subtitle>
                    <slot
                        name="subtitle"
                        :item="item"
                    >
                    </slot>
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-list-item-icon v-if="deletable">
                <v-icon
                    clickable
                    color="error"
                    @click="$emit('delete', item)"
                >
                    fas fa-times
                </v-icon>
            </v-list-item-icon>
        </v-list-item>
    </v-list>
</template>
