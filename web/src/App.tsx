// import { useState, useEffect } from 'react'
// import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react'
// export default function App() {
//   const { isSignedIn, getToken } = useAuth()
//   const [token, setToken] = useState<string>('')

//   useEffect(() => {
//     getToken().then((token) => {
//       setToken(token || '')
//     })
//   }, [isSignedIn])

//   return (
//     <header>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//       {isSignedIn && <div>{token}</div>}
//     </header>
//   )
// }

import React from 'react'
import Router from './router/index'
import './index.css'

const App: React.FC = () => {
  return <Router />
}

export default App
