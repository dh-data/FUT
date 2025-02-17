import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth
} from '@clerk/clerk-react'
export default function App() {
  const { isSignedIn, getToken } = useAuth()
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    getToken().then(token => {
      setToken(token || '')
    })
  }, [isSignedIn])

  const navigate = useNavigate()
  const handleLogin = () => {
    // 这里添加登录逻辑
    // 登录成功后跳转到 home 页面
    navigate('/chat', { replace: true })
  }
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {isSignedIn && <div>{token}</div>}
      <Button onClick={handleLogin} variant="outline">
        跳转到首页
      </Button>
    </header>
  )
}
