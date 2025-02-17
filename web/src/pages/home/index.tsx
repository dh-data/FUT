import { Button } from '@/components/ui/button'
import SidebarComponent from './Sidebar'
import ChatInterface from './ChatInterface'
import WaitChat from './WaitChat'
import Chatting from './Chatting'
import ChatPage from './ChatPage'
import { Outlet } from 'react-router-dom'
export default function Home() {
  return (
    <div className="flex flex-row w-screen  h-screen">
      <SidebarComponent />
      <div className="flex flex-col w-full h-full">
        <Outlet />
      </div>
      {/* <ChatInterface /> */}
      {/* <Chatting /> */}
      {/* <ChatPage/> */}
      {/* <WaitChat/> */}
    </div>
  )
}
