<script lang="ts" setup generic="T">
    import { computed, unref } from 'vue'
    import draggable from 'vuedraggable'

    type OrderableItem<T> = T & { order: number }

    const { items, editable = false } = defineProps<{
        items: OrderableItem<T>[]
        editable?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'modelValue', value: OrderableItem<T>[]): void
        (e: 'change', value: OrderableItem<T>[]): void
        (e: 'delete', value: OrderableItem<T>): void
        (e: 'edit', value: OrderableItem<T>): void
    }>()

    const onDelete = (value: OrderableItem<T>) => emit('delete', value)
    const onEdit = (value: OrderableItem<T>) => emit('edit', value)

    const modelValue = computed({
        get: () => items || [],
        set: (val) => {
            emit('modelValue', val)
        },
    })

    const onChange = () => {
        unref(modelValue).forEach((it, i) => it.order = i)
        emit('change', unref(modelValue))
    }
</script>
<template>
    <draggable
        v-model="modelValue"
        item-key="id"
        @change="onChange"
    >
        <template #item="{element}">
            <div
                class="d-flex justify-start align-center elevation-2 my-1 py-2 px-3 attribute-item white app-border-radius"
            >
                <v-icon
                    class="mr-3"
                    color="grey lighten-2"
                >
                    fas fa-grip-vertical
                </v-icon>
                <span>
                    <slot
                        name="title"
                        :item="element"
                    />
                </span>
                <v-spacer></v-spacer>
                <v-icon
                    v-if="editable"
                    color="primary"
                    class="mr-3"
                    clickable
                    @click="onEdit(element)"
                >
                    fas fa-pen
                </v-icon>

                <v-icon
                    color="error"
                    clickable
                    @click="onDelete(element)"
                >
                    fas fa-times
                </v-icon>
            </div>
        </template>
    </draggable>
</template>
