export class PaginationResponse<T> {
    items: T[]
    total: number

    constructor({ items, total }: { items: T[], total?: number }) {
        this.items = items
        this.total = total ?? items.length
    }
}
