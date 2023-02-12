export class MetaTag {
  constructor(MetaTagParams) {
    Object.keys(MetaTagParams).forEach((key) => {
      this[key] = MetaTagParams[key]
    })
  }

  static create(metaTag) {
    return new MetaTag(metaTag)
  }
}
