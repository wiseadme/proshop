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
<style lang="scss">
    $tree-item-width: 20vw;
    $margin-bottom: 20px;
    $button-height: 60px;
    $button-width: 200px;

    .tree {
        &-item {
            position: relative;
            margin-bottom: $margin-bottom;

            &--parent-line {
                position: absolute;
                width: $tree-item-width;
                height: 1px;
                top: calc(#{$button-height} / 2);
                left: -$tree-item-width / 2;
                background-color: #000;
            }

            &__cell {
                width: 20vw;
                position: relative;
            }

            &__button {
                position: relative;
                overflow: visible;
                display: block;
                white-space: pre-wrap;
            }

            &--has-child {
                &:after {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 50%;
                    left: 100%;
                    top: 50%;
                    height: 1px;
                    background-color: #000;
                }
            }
        }
    }

    .bottom-line {
        position: absolute;
        width: 1px;
        height: calc(100% - #{$margin-bottom} - #{$button-height / 2});
        left: 50%;
        background-color: #000;
    }
</style>
