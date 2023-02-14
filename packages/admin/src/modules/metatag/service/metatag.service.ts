import { useMetaTagsStore } from '@modules/metatag/store'
import { IMetaTag } from '@ecommerce-platform/types'

class Service {
  private _store: ReturnType<typeof useMetaTagsStore>
  public metaTag: Maybe<IMetaTag>

  constructor({ store }) {
    this._store = store
    this.metaTag = null
  }

  get metaTags() {
    return this._store.metaTags
  }

  setAsCurrent(metaTagDescriptor) {
    this.metaTag = metaTagDescriptor
  }

  createMetaTag(params) {
    return this._store.create(params)
  }

  updateMetaTag(updates) {
    updates._id = this.metaTag?._id

    return this._store.update(updates)
  }

  deleteMetaTag(id) {
    return this._store.delete(id)
  }

  fetchMetaTags(params = {}) {
    return this._store.read(params)
  }
}

export const useMetaTagService = () => new Service({
  store: useMetaTagsStore()
})
