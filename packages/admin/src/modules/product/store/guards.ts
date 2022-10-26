export const guards = {
  products: [
    items => ({
      next: !items.some(it => !it)
    })
  ]
}
