export const currencyRoutes = [
  {
    path: '/currency',
    component: () => import('@modules/currency/layouts/CurrencyLayout.vue'),
    name: 'currencies',
    children: [
      {
        path: '',
        component: () => import('@modules/currency/pages/CurrencyPage.vue'),
        name: 'currencies-page'
      }
    ]
  }
]
