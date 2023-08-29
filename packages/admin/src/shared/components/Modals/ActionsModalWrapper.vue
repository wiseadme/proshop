<script>

</script>
<template>
    <div
        class="app-border-radius grey lighten-3"
        style="overflow: hidden"
    >
        <v-row
            no-gutter
            style="height: 90vh"
        >
            <v-col
                cols="2"
                class="white secondary--text elevation-5 d-flex flex-column justify-start"
            >
                <v-row
                    class="mb-3 pa-2"
                    style="flex-basis: 60px"
                >
                    <v-col
                        style="height: 60px;"
                        class="primary white--text d-flex align-center justify-start align-self-start pl-4 app-border-radius elevation-2"
                    >
                        <slot name="header"/>
                    </v-col>
                </v-row>
                <v-row no-gutter>
                    <v-col>
                        <slot name="navigation"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        class="py-4 pl-4"
                        style="align-self: end"
                    >
                        <slot name="actions"/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="10">
                <v-row no-gutter>
                    <v-col style="overflow-y: auto; overflow-x: hidden; max-height: 90vh">
                        <slot name="content"/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
