import { useMetaTagsStore } from '@modules/metatag/store'

class Service {
  private _store: ReturnType<typeof useMetaTagsStore>

  constructor({ store }) {
    this._store = store
  }

  get metaTags() {
    return this._store.metaTags
  }

  createMetaTag(params) {
    return this._store.createMetaTag(params)
  }

  fetchMetaTags(params = {}) {
    return this._store.getMetaTags(params)
  }
}

export const useMetaTagService = () => new Service({
  store: useMetaTagsStore()
})
