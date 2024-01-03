<script lang="ts" setup>
    import { computed, unref } from 'vue'
    import OrganizationBlock from '@modules/settings/components/Merchant/OrganizationBlock.vue'
    import CurrenciesBlock from '@modules/settings/components/Merchant/CurrenciesBlock.vue'
    import ContactsBlock from '@modules/settings/components/Merchant/ContactsBlock.vue'
    import SocialBlock from '@modules/settings/components/Merchant/SocialBlock.vue'
    import { useMerchant } from '@modules/settings/composables/use-merchant'

    const { createMerchant, getMerchantSettings, updateMerchant, isEditMode } = useMerchant()

    const buttonLabel = computed(() => unref(isEditMode) ? 'Изменить' : 'Сохранить')

    const onSubmit = (validate) => {
        validate()
            .then(() => {
                if (unref(isEditMode)) {
                    updateMerchant()
                } else {
                    createMerchant()
                }
            })
    }

    getMerchantSettings()
</script>
<template>
    <v-layout>
        <v-row>
            <v-col>
                <v-form
                    v-slot="{validate}"
                    style="width: 100%"
                >
                    <v-card
                        elevation="2"
                        style="width: 100%"
                        color="white"
                        class="app-border-radius"
                    >
                        <v-card-content>
                            <v-row>
                                <v-col cols="6">
                                    <OrganizationBlock/>
                                </v-col>
                                <v-col cols="4">
                                    <CurrenciesBlock/>
                                </v-col>
                                <v-col
                                    cols="6"
                                    class="mt-4"
                                >
                                    <ContactsBlock/>
                                    <SocialBlock/>
                                </v-col>
                            </v-row>
                        </v-card-content>
                        <v-card-actions>
                            <v-button
                                color="primary"
                                class="ml-7 mb-7 px-4 app-border-radius"
                                elevation="2"
                                @click="onSubmit(validate)"
                            >
                                {{ buttonLabel }}
                            </v-button>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-layout>
</template>
<style lang="scss">
    @import "vue-color-kit/dist/vue-color-kit.css";
</style>
