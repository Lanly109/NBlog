export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        component: './404',
      },
    ],
  },
//   {
//     path: '/welcome',
//     name: 'welcome',
//     icon: 'smile',
//     component: './Welcome',
//   },
//   {
//     path: '/admin',
//     name: 'admin',
//     icon: 'crown',
//     access: 'canAdmin',
//     component: './Admin',
//     routes: [
//       {
//         path: '/admin/sub-page',
//         name: 'sub-page',
//         icon: 'smile',
//         component: './Welcome',
//       },
//       {
//         component: './404',
//       },
//     ],
//   },
//   {
//     name: 'list.table-list',
//     icon: 'table',
//     path: '/list',
//     component: './TableList',
//   },
  {
    name: 'articles',
    icon: 'file-text',
    path: '/articles',
    component: './Articles',
  },
  {
    name: 'publish',
    icon: 'edit',
    path: '/publish',
    component: './Publish',
  },
  {
    name: 'edit',
    icon: 'edit',
    path: '/edit/:id',
    component: './Edit',
  },
//   {
//     name: 'setting',
//     icon: 'setting',
//     path: '/setting',
//     component: './TableList',
//   },
  {
    path: '/',
    icon: 'file-text',
    layout: false,
    component: './Init',
  },
  {
    name: 'create',
    icon: 'setting',
    path: '/create',
    layout: false,
    component: './Create',
  },
  {
    component: './404',
  },
];
