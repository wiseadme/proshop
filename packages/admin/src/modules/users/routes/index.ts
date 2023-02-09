export const usersRoutes = [
  {
    path: '/users',
    component: () => import('@modules/users/layouts/UsersLayout.vue'),
    name: 'users',
    children: [
      {
        path: '',
        component: () => import('@modules/users/pages/UsersPage.vue'),
        name: 'users-table'
      }
    ]
  }
]
