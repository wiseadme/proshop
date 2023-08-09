<script lang="ts" setup generic="T">
    const { uniqueKey = 'id', deletable = true, editable = true } = defineProps<{
        items: T[]
        uniqueKey?: string
        deletable?: boolean
        editable?: boolean
    }>()

    defineEmits<{
        (e: 'delete', value: T): void
        (e: 'edit', value: T): void
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
            <v-list-item-content v-if="editable">
                <v-icon
                    clickable
                    color="primary"
                    class="mr-5"
                    @click="$emit('edit', item)"
                >
                    fas fa-pen
                </v-icon>
                <v-icon
                    v-if="deletable"
                    clickable
                    color="error"
                    class="mr-5"
                    size="20"
                    @click="$emit('delete', item)"
                >
                    fas fa-times
                </v-icon>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>
