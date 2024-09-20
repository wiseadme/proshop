<script lang="ts" setup>
    import { computed } from 'vue'

    import { useOptions } from '@modules/groups/composables/view/use-options'

    import type { IOption } from '@proshop-app/types'


    const props = defineProps<{
        options: IOption[]
    }>()

    const { onDeleteOption } = useOptions()

    const options = computed(() => props.options.slice().sort((a, b) => a.order - b.order))
</script>
<template>
    <v-row>
        <v-col>
            <v-tooltip
                v-for="option of options"
                :key="option.id"
                offset-y="-10"
                color="white"
                elevation="2"
                top
            >
                <template #activator="{ on }">
                    <v-chip
                        color="success"
                        :title="option.value"
                        closable
                        class="mr-2 elevation-2"
                        style="max-height: 150px"
                        v-on="on"
                        @close="onDeleteOption(option)"
                    />
                </template>
                <div class="option-description pa-2">
                    <div class="option-image">
                        <img
                            :src="option.image"
                            alt=""
                            style="width: 100px; height: 100px"
                        >
                    </div>
                    <span class="grey--text text--darken-3">{{ option.productName }}</span>
                </div>
            </v-tooltip>
        </v-col>
    </v-row>
</template>
