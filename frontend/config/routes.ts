﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
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
    component: './Welcome',
  },
  {
    name: 'setting',
    icon: 'setting',
    path: '/setting',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];