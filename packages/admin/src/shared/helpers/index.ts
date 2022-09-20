export const toString = obj => JSON.stringify(obj).trim()
export const clone = obj => JSON.parse(toString(obj))

export const getDifferences = (changed, origin) => {
  if (!origin) return null

  const diffs = {}

  for (const key in changed) {
    if (changed.hasOwnProperty(key)) {
      if (toString(changed[key]) !== toString(origin[key])) {
        diffs[key] = changed[key]
      }
    }
  }

  return Object.keys(diffs).length ? diffs : null
}
