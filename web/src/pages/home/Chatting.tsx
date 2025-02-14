import ChatInterface from "./ChatInterface"

const Chatting = () => {
  return (
    <div className="w-[100%] h-[100%]">
        <ChatInterface prompt={<div className="p-4">
          <div >What can I help with?</div>
        </div>} />
    </div>
  )
 }

export default Chatting