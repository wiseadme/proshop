import { ref, watch } from 'vue'
import { createSharedComposable } from '@shared/features/create-shared-composable'
import { useSiteService } from '@modules/settings/composables/use-site-service'
import { Site } from '@modules/settings/model/site.model'
import { ISite } from '@proshop/types'

export const useSite = createSharedComposable(() => {
    const {
        site,
        createSite,
        getSite
    } = useSiteService()
    const model = ref<ISite>(Site.create())

    watch(site, (siteConfig: ISite) => {
        model.value = Site.create(siteConfig)
    })

    return {
        model,
        getSite,
        createSite
    }
})
