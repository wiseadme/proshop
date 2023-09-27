<script lang="ts" setup generic="T">
    const {
        uniqueKey = 'id',
        deletable = true,
        editable = true
    } = defineProps<{
        modelValue: any
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
            class="my-1 mx-1 elevation-1 app-border-radius"
            :class="[modelValue && modelValue.id === item.id ? 'primary white--text' : 'white']"
        >
            <v-list-item-icon v-if="$slots.icon">
                <slot
                    name="icon"
                    :item="item"
                />
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>
                    <slot
                        name="title"
                        :item="item"
                    />
                </v-list-item-title>
                <v-list-item-subtitle>
                    <slot
                        name="subtitle"
                        :item="item"
                    />
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-spacer/>
            <v-list-item-content v-if="editable || deletable">
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
                                :color="modelValue && modelValue.id === item.id ? 'white': 'primary'"
                                v-on="listeners"
                            >
                                fas fa-bars
                            </v-icon>
                        </template>
                        <v-list active>
                            <v-list-item
                                v-if="editable"
                                @click="$emit('edit', item)"
                            >
                                <v-list-item-title>
                                    Редактировать
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                v-if="deletable"
                                @click="$emit('delete', item)"
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
    </v-list>
</template>
