<script lang="ts" setup generic="T">
    import {
        computed,
        ref,
        unref,
    } from 'vue'
    import draggable from 'vuedraggable'

    type OrderedItem<S> = S & { order: number }

    const {
        modelValue,
        editable = false,
        itemKey = 'id',
        itemClass = 'white',
    } = defineProps<{
        modelValue: Maybe<T[]>
        editable?: boolean
        deletable?: boolean
        itemKey?: string
        itemClass?: string
        group?: symbol | { name: string | symbol, pull: (...args: any[]) => any }
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: T[]): void
        (e: 'update', value: T[]): void
        (e: 'change', value: T[]): void
        (e: 'remove', value: T): void
        (e: 'delete', value: T): void
        (e: 'edit', value: T): void
        (e: 'sort', value: T): void
        (e: 'add', value: T): void
        (e: 'show-item-menu', value: T): void
    }>()

    const draggableItem = ref()

    const onRemove = (/*item*/) => {
        emit('remove', unref(draggableItem))
    }

    const onDelete = (item: T) => emit('delete', item)

    const onEdit = (item: T) => emit('edit', item)

    const items = computed({
        get: () => modelValue || [],
        set: (val) => emit('update:modelValue', val as T[]),
    })

    const onChange = () => {
        (unref(items) as OrderedItem<T>[]).forEach((it, i) => it.order = i)
        emit('change', unref(items) as T[])
    }

    const onAdd = (item: any) => {
        const value = modelValue![item.newIndex as number] as OrderedItem<T>
        value.order = Number(item.newIndex)
        emit('add', value)
    }

    const onUpdate = () => {
        emit('update', unref(items) as OrderedItem<T>[])
    }

    const onSort = (val) => {
        emit('sort', val)
    }

    const onDragStart = (item) => {
        draggableItem.value = modelValue![item.oldIndex]
    }
</script>
<template>
    <v-list
        class="draggable-list pa-2"
        color="transparent"
    >
        <draggable
            :list="items"
            :item-key="itemKey"
            :group="group"
            class="draggable-container"
            @add="onAdd"
            @start="onDragStart"
            @sort="onSort"
            @remove="onRemove"
            @change="onChange"
            @update="onUpdate"
        >
            <template #item="{element}">
                <div>
                    <v-tooltip
                        top
                        offset-y="-10"
                        color="rgba(0,0,0,.7)"
                        elevation="3"
                    >
                        <template #activator="{on}">
                            <v-list-item
                                :class="['draggable-item mb-1 elevation-1 app-border-radius', itemClass]"
                                v-on="on"
                            >
                                <v-list-item-icon>
                                    <v-icon
                                        class="mr-3"
                                        color="grey lighten-2"
                                    >
                                        fas fa-grip-vertical
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <slot
                                            name="title"
                                            :item="element as T"
                                        />
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        <slot
                                            name="subtitle"
                                            :item="element as T"
                                        />
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-spacer/>
                                <v-list-item-content
                                    v-if="editable || deletable"
                                    class="menu"
                                >
                                    <v-list-item-icon>
                                        <v-menu
                                            open-on-click
                                            width="150"
                                            offset-y="-10"
                                            bottom
                                        >
                                            <template #activator="{on: listeners}">
                                                <v-icon
                                                    clickable
                                                    color="primary"
                                                    v-on="listeners"
                                                    @click="$emit('show-item-menu', element as T)"
                                                >
                                                    fas fa-bars
                                                </v-icon>
                                            </template>
                                            <v-list active>
                                                <v-list-item
                                                    v-if="editable"
                                                    @click="onEdit(element)"
                                                >
                                                    <v-list-item-title>
                                                        Редактировать
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item
                                                    v-if="deletable"
                                                    @click="onDelete(element as T)"
                                                >
                                                    <v-list-item-title>
                                                        Удалить
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-list-item-icon>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <span>
                            <slot
                                name="tooltip"
                                :item="element as T"
                            />
                        </span>
                    </v-tooltip>
                </div>
            </template>
        </draggable>
    </v-list>
</template>
<style lang="scss" scoped src="./DraggableItemsList.scss"/>
