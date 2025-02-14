

import React, { useState, ReactNode,useEffect,useRef } from 'react';
import { Textarea } from "@/components/ui/textarea"
import {CircleArrowUp,ArrowUp} from "lucide-react"


// 样式
const chatInterfaceClass="flex flex-col w-[100%] h-[100%] bg-[var(--bg-color-hover)]"
const blockClass="pl-[24px] h-[100%] pr-[24px]"
const contentBlockClass="h-[100%] max-w-[860px] mx-auto flex flex-col justify-between pt-[20px] pb-[20px]"

const chatInputClass="w-[100%] max-w-[860px]  min-h-[112px] max-h-[500px] bg-[#fff] rounded-[24px] p-[10px]"
const textareaClass="border-0 outline-none focus:outline-none focus:ring-0 active:ring-0 active:outline-none bg-transparent"
const ArrowUpClass="flex justify-center items-center h-[32px] w-[32px] rounded-[50%]  text-[#fff]"
interface ChatInterfaceProps {
    prompt?:ReactNode,
    children?: ReactNode;
}



const ChatInterface: React.FC<ChatInterfaceProps> = ({ prompt ,children }) => {
    // 数据发送操作
    const [inputText, setInputText] = useState("");
    const inputRef = useRef(null);
      // 发送消息
  const handleSend = () => {
    if (inputText.trim() === "") return;

   
    const newMessage = {
    //   id: messages.length + 1,
      role: "user",
      text: inputText,
    //   time: new Date(),
    };
    console.log(newMessage,'>>>newMessage')
    setInputText("");
  };
    // 输入框回车发送
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        console.log('>>>>输入框回车')
    //   handleSend();
    }
  };
    return (
        <div className='w-[100%] h-[100%] bg-[#ccc]'>
            <div className={chatInterfaceClass}>

            {/* 预存选择模型 */}
            {/* <div>标头</div> */}
            {/* 聊天数据块 */}
            <div className={blockClass}>
                <div className={contentBlockClass}>
                {/* 信息展示 */}
                {prompt && <div className='h-[50%] flex  justify-center items-end'>{prompt}</div>}
                {/* 信息展示/数据展示 */}
                <div className='overflow-hidden overflow-y-auto'>{children}</div>
                {/* 输入框 */}
                <div>
                    <div>
                        <div className={chatInputClass}>
                            <div className='textareaChat'>
                                <Textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                ref={inputRef}
                                placeholder='Please send a message' />
                            </div>
                            <div className='flex row justify-end items-end w-[100%] mt-[6px]'>
                                <div className={inputText? `${ArrowUpClass} bg-[#4d6bfe] cursor-pointer`:`${ArrowUpClass} bg-[#D6DEE8] cursor-no-drop`} >
                                    <ArrowUp onClick={handleSend} />
                                </div>
                            </div>
                        </div>
                        {/* <div>内容Ai生成/提示</div> */}
                    </div>
                </div>
            
            </div>
            </div>
            </div>
        </div>
    )
}

export default ChatInterface;