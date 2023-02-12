export const guards = {
  attributes: [
    items => {
      const isArray = Array.isArray(items)

      return {
        next: isArray,
        value: isArray ? items.sort((a, b) => a.order - b.order) : null
      }
    },
    // items => ({
    //   next: !!items,
    //   value: items.sort((a, b) => a.order - b.order)
    // })
  ]
}
