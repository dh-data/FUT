import { Button } from "@/components/ui/button"
import SidebarComponent from "./Sidebar"
import ChatInterface from "./ChatInterface"
import WaitChat from "./WaitChat"
import Chatting from "./Chatting"
export default function Home() {
  return (
   <div  className="flex flex-row w-screen  h-screen">
    <SidebarComponent />
    {/* <ChatInterface /> */}
    <Chatting/>
    {/* <WaitChat/> */}
   </div>

  )
}