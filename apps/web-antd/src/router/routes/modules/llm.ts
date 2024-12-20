import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: 'LLM服务管理',
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: '模板管理',
        },
        name: 'AntDesignDemos',
        path: '/demos/ant-design',
        component: () => import('#/views/llm/tempManagement/index.vue'),
      },
    ],
  },
];

export default routes;
