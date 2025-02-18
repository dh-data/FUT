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
    // !TODO:浏览器中页面刷新或手动url上不起作用，导致页面空白
    children: [
      {
        path: '/chat/empty',
        element: <WaitChat />
      },
      // 动态路由
      {
        path: '/chat/:id?',
        element: <Chatting />
      },
      // {
      //   path: '/chat/empty',
      //   element: <Navigate to="/chat/empty" replace />
      // },
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
