<script lang="ts" setup>
    import { useRouter } from 'vue-router'

    const { tabs } = defineProps<{
        modelValue: any
        tabs: any[]
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: any): void
    }>()

    const router = useRouter()

    const onClick = (newTab) => {
        router.push({
            name: newTab.route,
            params: {
                productId: router.currentRoute.value.params.productId,
                section: newTab.section
            }
        })

        emit('update:modelValue', newTab)
    }

</script>
<template>
    <div class="tab-selector app-border-radius">
        <div class="tab-selector__tabs d-flex px-2">
            <v-button
                v-for="tab in tabs"
                :key="tab.section"
                :color="tab.title === modelValue.title ? 'primary': 'white'"
                :elevation="tab.title === modelValue.title ? 2 : 0"
                :disabled="tab.disabled"
                class="mr-1 px-4"
                @click="onClick(tab)"
            >
                <span
                    :style="{fontSize: 'calc(100vw / 1920 * 15)'}"
                    :class="[tab.title === modelValue.title ? 'white--text' : 'secondary--text']"
                >{{ tab.title }}</span>
            </v-button>
        </div>
        <div class="tab-selector__content pt-6">
            <v-row no-gutter>
                <v-col>
                    <slot name="content">
                        <div class="pa-4">
                            is empty here
                        </div>
                    </slot>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>

    .tab-selector {
        &__tabs {

        }
    }
</style>
