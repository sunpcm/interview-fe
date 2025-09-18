import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/ui/Loading';
import { routes } from './routes';

// 为路由添加布局
const routesWithLayout = routes.map(route => ({
  ...route,
  element: (
    <Layout>
      <Suspense fallback={<Loading />}>{route.element}</Suspense>
    </Layout>
  ),
}));

export const router = createBrowserRouter(routesWithLayout);
