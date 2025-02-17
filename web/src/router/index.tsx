import React, { lazy, Suspense } from 'react'
import {
  Routes,
  Route,
  Navigate,
  RouteObject,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// 懒加载组件
const Login = lazy(() => import('@/pages/login'))
const Home = lazy(() => import('@/pages/home'))
const WaitChat = lazy(() => import('@/pages/home/WaitChat'))
const Chatting = lazy(() => import('@/pages/home/Chatting'))
// 加载提示组件
const LoadingComponent = () => <div>加载中...</div>

// 路由配置
export const routes: RouteObject[] = [
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/chat',
    element: <Home />,
    children: [
      {
        path: 'empty',
        element: <WaitChat />
      },
      // 动态路由
      {
        path: ':id',
        element: <Chatting />
      },
      {
        path: '',
        element: <Navigate to="empty" replace />
      },
      {
        path: '*',
        element: <div>页面不存在</div>
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/auth" replace />
  }
]

// createBrowserRouter + RouterProvider
const Router: React.FC = () => {
  const router = createBrowserRouter(routes)
  return (
    <Suspense fallback={<LoadingComponent />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
export default Router
