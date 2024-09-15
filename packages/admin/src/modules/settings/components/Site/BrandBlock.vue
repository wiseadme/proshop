<script lang="ts" setup>
    import { useSiteService } from '@modules/settings/composables/use-site-service'

    import { ImagesLoader } from '@shared/components/ImagesLoader'

    const {site} = useSiteService()

    console.log(site)
</script>
<template>
    <images-loader
        :assets="[]"
    >
        <template #context-menu>
            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        Salam
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </template>
    </images-loader>
</template>
