export const guards = {
  products: [
    products => {
      return {
        next: !products.some(it => !it)
      }
    }
  ]
}
