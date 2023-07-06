import { useSiteStore } from '@modules/settings/store/site'
import { computed } from 'vue'
import { ISite } from '@proshop/types'

export const useSiteService = () => {
    const _store = useSiteStore()
    const {
        createSiteConfig,
        getSiteConfig
    } = _store

    const site = computed(() => _store.site)

    const createSite = (config: ISite) => {
        return createSiteConfig(config)
    }

    const getSite = () => getSiteConfig()

    return {
        site,
        getSite,
        createSite
    }
}
