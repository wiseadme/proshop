import { ref, unref } from 'vue'

export type TreeItem<T> = T & {
    id: string,
    title: string,
    parentId: string,
    children: T[],
    hasChild: boolean
}
export const useTreeView = <T>() => {
    const treeItems = ref<TreeItem<T>[]>([])

    const buildTreeItems = <T>(items: TreeItem<T>[]) => {
        items.forEach((item) => {
            if (item.parentId) {
                const parent = items.find(it => it.id === item.parentId)! as TreeItem<T>

                parent.children ??= []
                parent.children.push(item)
                parent.hasChild = true
            } else {
                // @ts-ignore
                unref(treeItems).push(item as TreeItem<T>)
            }
        })
    }

    return {
        treeItems,
        buildTreeItems,
    }
}
