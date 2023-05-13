<script lang="ts" setup>
    import VueApexChart from 'vue3-apexcharts'

    const yearChartParams = {
        options: {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
            },
            dataLabels: {
                enabled: true
            },
        },
        series: [
            {
                name: 'Чистая прибыль',
                data: [ 44, 55, 57, 56, 61, 58, 63, 60, 66 ]
            },
            {
                name: 'Доход',
                data: [ 76, 85, 101, 98, 87, 105, 91, 114, 94 ]
            },
            {
                name: 'Свободный денежный поток',
                data: [ 35, 41, 36, 26, 45, 48, 52, 53, 41 ]
            }
        ]
    }

</script>
<template>
    <div class="dashboard-page">
        <v-row>
            <v-col
                xl="4"
                lg="6"
                md="6"
                sm="12"
            >
                <v-card
                    color="white"
                    elevation="2"
                    width="100%"
                >
                    <v-card-title>
                        Продажи за год
                    </v-card-title>
                    <v-card-content>
                        <vue-apex-chart
                            :options="yearChartParams.options"
                            :series="yearChartParams.series"
                        />
                    </v-card-content>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
