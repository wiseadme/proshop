import { ref, watch } from 'vue'

import { useSiteService } from '@modules/settings/composables/use-site-service'

import { createSharedComposable } from '@shared/composables/features/create-shared-composable'


import { Site } from '@modules/settings/model/site.model'

import type { ISite } from '@proshop-app/types'

export const useSite = createSharedComposable(() => {
    const {
        site,
        createSite,
        getSite,
        updateSite
    } = useSiteService()

    const model = ref<ISite>(Site.create())

    watch(site, (siteConfig: ISite) => {
        model.value = Site.create(siteConfig)
    })

    return {
        model,
        site,
        getSite,
        updateSite,
        createSite
    }
})
