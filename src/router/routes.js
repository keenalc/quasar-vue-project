
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name:'loan', component: () => import('pages/loan-app/Loan.vue') },
      { path: '/manage-loan/:id', name:'manage-loan',  component: () => import('pages/loan-app/ManageLoan.vue') },
      { name: 'design', path: '/design', component: () => import('pages/design.vue') },
    ]
  },


  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
