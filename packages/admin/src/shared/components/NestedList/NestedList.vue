<script lang="ts" setup generic="T">
    import { ref } from 'vue'

    defineProps<{
        modelValue: number[]
        items: T[]
    }>()

    const selected = ref<number[]>([])
</script>
<template>
    <v-list
        v-model:value="selected"
        active
        multiple
        class="px-2"
    >
        <template
            v-for="it in items"
            :key="it.id"
        >
            <v-list-item
                v-if="!it.children?.length && !it.parent"
                v-slot="{active}"
                class="elevation-1 my-1 app-border-radius"
            >
                <v-list-item-icon>
                    <v-icon :icon=" active.value ? 'far fa-check-square' : 'far fa-square'"/>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ it.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="it.parent">
                        {{ it.parent!.title }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-group
                v-else-if="!it.parent && it.children?.length"
                prepend-icon="fas fa-list"
                class="elevation-1 app-border-radius my-1 categories-group"
            >
                <template #header>
                    {{ it.title }}
                </template>
                <template
                    v-for="child in it.children"
                    :key="child.id"
                >
                    <v-list-item
                        v-if="!child.children?.length"
                        v-slot="{active}"
                        class="categories-group__item"
                    >
                        <v-list-item-icon>
                            <v-icon :icon=" active.value ? 'far fa-check-square' : 'far fa-square'"/>
                        </v-list-item-icon>
                        <v-list-item-title>
                            {{ child.title }}
                        </v-list-item-title>
                    </v-list-item>
                    <nested-list
                        v-else
                        v-model="selected"
                        :items="child.children"
                    />
                </template>
            </v-group>
        </template>
    </v-list>
</template>
