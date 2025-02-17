import ChatInterface from './ChatInterface'
import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ScrollToBottom from 'react-scroll-to-bottom'
import dayjs from 'dayjs'
import { FaUser, FaRobot } from 'react-icons/fa'
import useTypewriter from '@/hooks/useTypewriter'
import '../../assets/styles/chatting.css'

import { useNavigate, useLocation } from 'react-router-dom'

// 模拟聊天消息数据
const initialMessages = [
  {
    id: 1,
    role: 'user',
    text: '你好，请帮我写一个 Python 的快速排序代码。',
    time: new Date()
  },
  {
    id: 2,
    role: 'assistant',
    text: '当然！以下是 Python 实现的快速排序代码：\n\n```python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n```',
    time: new Date()
  },
  {
    id: 3,
    role: 'user',
    text: '你好，请帮我写一个 Python 的快速排序代码。',
    time: new Date()
  },
  {
    id: 4,
    role: 'assistant',
    text: '当然！以下是 Python 实现的快速排序代码：\n\n```python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n```',
    time: new Date()
  },
  {
    id: 5,
    role: 'user',
    text: '你好，请帮我写一个 Python 的快速排序代码。',
    time: new Date()
  },
  {
    id: 6,
    role: 'assistant',
    text: '当然！以下是 Python 实现的快速排序代码：\n\n```python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n```',
    time: new Date()
  }
]
// 消息组件
const ChatMessage = ({ message }) => {
  const { role, text, time } = message
  const displayText = useTypewriter(text, role, 20)
  const location = useLocation()

  useEffect(() => {
    console.log('路由变化：', location.pathname)
  }, [location])
  return (
    <div className={`message ${role}`}>
      <div className="avatar">
        {role === 'user' ? <FaUser size={20} /> : <FaRobot size={20} />}
      </div>
      <div className="content">
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
    </div>
  )
}
const Chatting = () => {
  const [messages, setMessages] = useState(initialMessages)
  const navigate = useNavigate()

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
