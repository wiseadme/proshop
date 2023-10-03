<script lang="ts" setup generic="T extends {id: string, title: string, parentId: string, children: T[]}">
    const { items, value = {} } = defineProps<{
        value?: Record<string, any>
        items: T[]
        isSubTree?: boolean
    }>()

    defineEmits<{
        (e: 'toggle', val: T)
    }>()

</script>
<template>
    <div class="tree">
        <template
            v-for="(item, i) in items"
            :key="item.id"
        >
            <div class="tree-item d-flex">
                <div class="tree-item__cell d-flex justify-center">
                    <v-button
                        width="200"
                        :color="value[item.id] ? 'success' : 'secondary'"
                        elevation="2"
                        :disabled="!!item.children"
                        :class="{
                            'tree-item__button': true,
                            'tree-item--has-child' : item.children,
                            'tree-item--has-parent': i && item.parentId
                        }"
                        style="z-index: 1; height: 60px"
                        @click="$emit('toggle', item)"
                    >
                        {{ item.title }}
                    </v-button>
                    <div class="right-line"></div>
                    <div class="bottom-line"></div>
                </div>
                <div
                    v-if="item.parentId"
                    class="tree-item--parent-line"
                ></div>
                <template v-if="item.children?.length">
                    <tree-view
                        :value="value"
                        :items="item.children"
                        @toggle="$emit('toggle', $event)"
                    />
                </template>
            </div>
        </template>
    </div>
</template>
<style lang="scss" scoped>
    @import "TreeView";
</style>
