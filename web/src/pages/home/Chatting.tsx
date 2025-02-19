import ChatInterface from './ChatInterface'
import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ScrollToBottom from 'react-scroll-to-bottom'
import dayjs from 'dayjs'
import { User, Bot, PenLine, Copy } from 'lucide-react' // 修改图标导入
import useTypewriter from '@/hooks/useTypewriter'
import '../../assets/styles/chatting.css'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useNavigate, useLocation } from 'react-router-dom'

// 模拟聊天消息数据
const initialMessages = [
  {
    id: 1,
    role: 'user',
    text: '你的代码中存在一些问题，主要是 TooltipItem 组件的实现和 TooltipTrigger 的使用方式。以下是改进后的代码，并附上解释：',
    time: new Date()
  },
  {
    id: 2,
    role: 'assistant',
    text: '当然！以下是 Python 实现的快速排序代码：\n\n```python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n```',
    time: new Date()
  }
]

// 提取工具提示组件
const TooltipItem = ({
  title,
  onClick,
  className,
  children
}: {
  title: string
  onClick: () => void
  className?: string
  children: React.ReactNode
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div onClick={onClick} className="action-icon">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white shadow-lg border-0">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// 编辑消息
const Chatting = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [editingMessage, setEditingMessage] = useState<{
    id: number
    text: string
  } | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // 保存编辑的消息
  const handleSaveEdit = (id: number, newText: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.id === id ? { ...msg, text: newText } : msg))
    )
    setEditingMessage(null)
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingMessage(null)
  }

  // 消息组件
  const ChatMessage = ({
    message
  }: {
    message: (typeof initialMessages)[number]
  }) => {
    const { role, text, time } = message
    const displayText = useTypewriter(text, role, 20)

    useEffect(() => {
      console.log('路由变化：', location.pathname)
    }, [location])

    return (
      <div className={`message ${role} max-w-[860px] mx-auto`}>
        {role === 'user' ? (
          <div className="user-action">
            <TooltipItem
              title="复制"
              onClick={() => {
                navigator.clipboard.writeText(text)
              }}
            >
              <Copy />
            </TooltipItem>
            <TooltipItem
              title="编辑消息"
              onClick={() => {
                setEditingMessage(message)
              }}
            >
              <PenLine />
            </TooltipItem>
          </div>
        ) : (
          <div className="avatar">
            <Bot size={20} strokeWidth={1.5} />
          </div>
        )}
        {editingMessage?.id === message.id ? (
          <div className="edit-message">
            <Textarea
              text-sm
              value={editingMessage.text}
              onChange={e => {
                setEditingMessage(prev => ({ ...prev, text: e.target.value }))
              }}
              className="w-full"
            />
            <div className="flex justify-end gap-2 mt-[10px]">
              <Button className="button-cancel " onClick={handleCancelEdit}>
                取消
              </Button>

              <Button
                className="button-save"
                onClick={() => handleSaveEdit(message.id, editingMessage.text)}
              >
                发送
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`${role === 'user' ? 'user-content' : 'assistant-content'} content`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {displayText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    )
  }

  return (
    <ChatInterface>
      <ScrollToBottom className="messages-container">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </ScrollToBottom>
    </ChatInterface>
  )
}

export default Chatting
