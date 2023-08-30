export const toString = obj => JSON.stringify(obj).trim()
export const clone = obj => JSON.parse(toString(obj))

export const getDifferences = (changed, origin) => {
    if (!origin) return null

    const diffs = {}

    for (const key in changed) {
        if (changed[key] && changed.hasOwnProperty(key)) {
            if (toString(changed[key]) !== toString(origin[key])) {
                diffs[key] = changed[key]
            }
        }
    }

    return Object.keys(diffs).length ? diffs : null
}

export const stringToSnakeUpperCase = (value: string) => value.replace(/([a-z]+)([A-Z])/g, '$1_$2').toUpperCase()

export type TreeItem<T> = T & { id: string, title: string, parentId: string, children: T[] }
export const buildTreeItems = <T>(items: TreeItem<T>[]): TreeItem<T>[] => {
    const list: TreeItem<T>[] = []

    items.forEach((item) => {
        if (item.parentId) {
            const parent = items.find(it => it.id === item.parentId)! as TreeItem<T>

            parent.children ??= []
            parent.children.push(item)
        } else {
            list.push(item as TreeItem<T>)
        }
    })

    return list
}
