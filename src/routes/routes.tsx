import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// 懒加载页面组件
const Home = lazy(() => import('@/pages/home'));
const Playground = lazy(() => import('@/pages/playground'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/playground',
    element: <Playground />,
  },
];
