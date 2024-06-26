<script lang="ts" setup>
    import {
        computed,
        onBeforeMount,
        unref
    } from 'vue'

    import { useMerchant } from '@modules/settings/composables/use-merchant'

    import ContactsBlock from '@modules/settings/components/Merchant/ContactsBlock.vue'
    import CurrenciesBlock from '@modules/settings/components/Merchant/CurrenciesBlock.vue'
    import OrganizationBlock from '@modules/settings/components/Merchant/OrganizationBlock.vue'
    import SocialBlock from '@modules/settings/components/Merchant/SocialBlock.vue'


    const {
        isEditMode,
        createMerchant,
        getMerchantSettings,
        updateMerchant
    } = useMerchant()

    const buttonLabel = computed(() => unref(isEditMode) ? 'Изменить' : 'Сохранить')

    const onSubmit = (validate: () => Promise<boolean>) => {
        validate()
            .then(() => {
                if (unref(isEditMode)) {
                    updateMerchant()
                } else {
                    createMerchant()
                }
            })
    }

    onBeforeMount(getMerchantSettings)
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
                                    <organization-block/>
                                </v-col>
                                <v-col cols="4">
                                    <currencies-block/>
                                </v-col>
                                <v-col
                                    cols="6"
                                    class="mt-4"
                                >
                                    <contacts-block/>
                                    <social-block/>
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
