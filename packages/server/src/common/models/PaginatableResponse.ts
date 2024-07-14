export class PaginatableResponse {
    items: any[]
    total: number

    constructor({ items, total }: { items: any[], total?: number }) {
        this.items = items
        this.total = total ?? items.length
    }
}
