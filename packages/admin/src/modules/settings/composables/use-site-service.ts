import { computed } from 'vue'

import { ISite } from '@proshop/types'

import { useSiteStore } from '@modules/settings/store/site'

export const useSiteService = () => {
    const _store = useSiteStore()
    const {
        createSiteConfig,
        getSiteConfig,
        updateSiteConfig
    } = _store

    const site = computed(() => _store.site)

    const createSite = (config: ISite) => {
        return createSiteConfig(config)
    }

    const getSite = () => getSiteConfig()

    const updateSite = (updates) => updateSiteConfig(updates)

    return {
        site,
        getSite,
        updateSite,
        createSite
    }
}
