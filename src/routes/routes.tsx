import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// 懒加载页面组件
const Home = lazy(() => import('@/pages/home'));
// const About = lazy(() => import('@/pages/About'));
// const NotFound = lazy(() => import('@/pages/NotFound'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];
