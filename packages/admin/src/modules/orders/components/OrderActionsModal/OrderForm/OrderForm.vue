<script lang="ts" setup>
    import type { ICartItem, IOrder } from '@proshop-app/types'

    defineProps<{
        orderId: string | number
        client: IOrder['customer']
        items: ICartItem[]
        status: IOrder['status']
        qrcode: string
    }>()

</script>
<template>
    <v-form v-slot="{validate}">
        <v-card
            class="elevation-3"
            width="100%"
            color="rgba(0,0,0,.4)"
        >
            <v-card-title class="card-title white--text text--base">
                Форма заказа
            </v-card-title>
            <v-card-content class="white">
                <v-layout>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label=""
                            />
                        </v-col>
                    </v-row>
                </v-layout>
            </v-card-content>
            <v-card-actions>
                <v-button @click="validate">
                    создать
                </v-button>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
