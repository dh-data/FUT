import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, RouteObject } from 'react-router-dom';

// 懒加载组件
const Login = lazy(() => import('@/pages/login'));
const Home = lazy(() => import('@/pages/home'));

// 加载提示组件
const LoadingComponent = () => (
  <div>加载中...</div>
);

// 路由配置
export const routes: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <Navigate to="/login" replace />
  // },
  {
    path: '/', 
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

const Router: React.FC = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;