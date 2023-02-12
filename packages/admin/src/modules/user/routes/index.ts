export const usersRoutes = [
  {
    path: '/user',
    component: () => import('@modules/user/layouts/UsersLayout.vue'),
    name: 'users',
    children: [
      {
        path: '',
        component: () => import('@modules/user/pages/UsersPage.vue'),
        name: 'user-table'
      }
    ]
  }
]
