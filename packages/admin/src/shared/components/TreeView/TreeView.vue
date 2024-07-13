<script lang="ts" setup generic="T extends {id: string, title: string, parentId: string, children: unknown[]}">
    import { ref, unref } from 'vue'

    import VueTree from '@ssthouse/vue3-tree-chart'

    const { items = [], value = {} } = defineProps<{
        value?: Record<string, any>
        items: T[]
        isSubTree?: boolean
    }>()

    const emit = defineEmits<{ (e: 'toggle', val: T): void }>()

    const treeRef = ref<any>(null)
    const treeConfig = { nodeWidth: 240, nodeHeight: 70, levelHeight: 200 }

    const onClick = (node) => {
        // if (node.hasChild) return

        emit('toggle', node)
    }

    const zoomIn = () => unref(treeRef)!.zoomIn()
    const zoomOut = () => unref(treeRef)!.zoomOut()

    // onMounted(() => {
    //     unref(treeRef).restoreScale()
    // })

</script>
<template>
    <div class="tree">
        <v-row class="py-2 mb-2">
            <v-col
                style="width: 120px"
                class="elevation-2 pa-2 app-border-radius d-flex justify-space-between"
            >
                <v-button
                    color="secondary"
                    class="mr-2 app-border-radius"
                    elevation="2"
                    round
                    @click="zoomOut"
                >
                    <v-icon>fas fa-minus</v-icon>
                </v-button>
                <v-button
                    color="secondary"
                    class="app-border-radius"
                    elevation="2"
                    @click="zoomIn"
                >
                    <v-icon>fas fa-plus</v-icon>
                </v-button>
            </v-col>
        </v-row>
        <vue-tree
            ref="treeRef"
            style="width: 100%; height:67vh; border: thin solid #d7d7d7"
            :dataset="items"
            :config="treeConfig"
            direction="vertical"
            link-style="straight"
            :collapse-enabled="false"
        >
            <template #node="{node}">
                <div
                    style="width: auto; min-width: 120px; max-width: 220px; height: 100%; text-align: center"
                    class="app-border-radius elevation-2 white--text d-flex justify-center align-center px-4"
                    :class="{/*['grey lighten-1']: node.hasChild, */success: value[node.id], secondary: !value[node.id]}"
                    @click.prevent="onClick(node as T)"
                >
                    {{ node.title }}
                </div>
            </template>
        </vue-tree>
    </div>
</template>
<style lang="scss">
    @import "./TreeView";
</style>
