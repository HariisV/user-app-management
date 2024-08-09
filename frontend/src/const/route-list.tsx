import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

const getComponent = (path: any) => {
  const Component = lazy(() => path);

  return () => (
    <Suspense fallback={<div></div>}>
      <Component />
    </Suspense>
  );
};
const adminRoutesList = [
  {
    path: '/',
    component: getComponent(import('@/pages/user')),
  },
  {
    path: '/profile',
    component: getComponent(import('@/pages/profile')),
  },
];

export const adminRoutes = adminRoutesList.map((route) => (
  <Route key={route.path} path={route.path} element={<route.component />} />
));
