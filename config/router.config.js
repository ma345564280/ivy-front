export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
      {
        component: '404',
      },
    ],
  },
  // 首页
  {
    path: '/home',
    routes: [
      { path: '/home', component: './Home/Home' },
      {
        component: '404',
      },
    ],
  },
  // 分享页
  {
    path: '/introduction',
    routes: [
      { path: '/introduction', component: './Introduction/Introduction' },
      {
        component: '404',
      },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/home'},
      // dashboard
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'home',
        component: './Welcome/Welcome',
        authority: ['VIEW_DESIGN_PAGE'],
      },

      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
            authority: ['VIEW_DESIGN_PAGE'],
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
            authority: ['VIEW_DESIGN_PAGE'],
          },

        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          {
            path: '/profile/profile',
            name: 'profile',
            component: './Profile/ProfileForm',
            authority: ['VIEW_DESIGN_PAGE'],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
