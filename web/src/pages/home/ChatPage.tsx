import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ScrollToBottom from 'react-scroll-to-bottom'
import dayjs from 'dayjs'
import { FaUser, FaRobot } from 'react-icons/fa'

// import "../../assets/styles/chatPage.css";

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
  }
]

// 消息组件
const ChatMessage = ({ message }) => {
  const { role, text, time } = message
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
          {text}
        </ReactMarkdown>
        <div className="timestamp">{dayjs(time).format('HH:mm')}</div>
      </div>
    </div>
  )
}

// 聊天页面组件
const ChatPage = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const inputRef = useRef(null)

  // 发送消息
  const handleSend = () => {
    if (inputText.trim() === '') return

    const newMessage = {
      id: messages.length + 1,
      role: 'user',
      text: inputText,
      time: new Date()
    }

    setMessages([...messages, newMessage])
    setInputText('')

    // 模拟机器人回复
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        role: 'assistant',
        text: '这是模拟的机器人回复。',
        time: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  // 输入框回车发送
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="chat-container">
      <ScrollToBottom className="messages-container">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </ScrollToBottom>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          ref={inputRef}
        />
        <button onClick={handleSend}>发送</button>
      </div>
    </div>
  )
}

export default ChatPage
