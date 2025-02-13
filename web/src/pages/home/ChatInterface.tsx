

import React, { useState, ReactNode } from 'react';
import { Textarea } from "@/components/ui/textarea"


// 样式
const chatInterfaceClass="flex flex-col w-[100%] h-[100%] bg-[var(--bg-color-hover)]"
const blockClass="pl-[24px] h-[100%] pr-[24px]"
const contentBlockClass="h-[100%] max-w-[860px] mx-auto"

const chatInputClass="w-[100%] max-w-[860px] h-[112px] bg-[#ccc] rounded-[24px] p-[10px]"
const textareaClass="border-0 outline-none focus:outline-none focus:ring-0 active:ring-0 active:outline-none bg-transparent"
interface ChatInterfaceProps {
    prompt?:ReactNode,
    children?: ReactNode;
}



const ChatInterface: React.FC<ChatInterfaceProps> = ({ prompt ,children }) => {
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
                <div>{children}</div>
                {/* 输入框 */}
                <div>
                    <div>
                        <div className={chatInputClass}>
                            <div className='textareaChat'>
                                <Textarea />
                            </div>
                            <div>
                                <div>提交</div>
                            </div>
                        </div>
                        <div>内容Ai生成/提示</div>
                    </div>
                </div>
            
            </div>
            </div>
            </div>
        </div>
    )
}

export default ChatInterface;