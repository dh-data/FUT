import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createTodo } from '@/api/todo'

interface TodoDetail {
  id: string
  title: string
  content: string
  completed: boolean
  createdAt: string
}

const TodoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [todo, setTodo] = useState<TodoDetail>({
    id: '1',
    title: '完成项目文档',
    content: `# 项目文档大纲

## 1. 项目简介
- 项目背景
- 项目目标
- 项目范围

## 2. 技术架构
\`\`\`typescript
interface Project {
  name: string;
  version: string;
  dependencies: {
    [key: string]: string;
  }
}
\`\`\`

## 3. 功能模块
- [ ] 用户管理
- [ ] 权限控制
- [ ] 数据统计
`,
    completed: false,
    createdAt: '2024-03-20'
  })

  useEffect(() => {
    // 这里可以根据 id 从后端获取待办详情
    console.log('Fetching todo with id:', id)
  }, [id])

  const handleCreateTodo = async () => {
    try {
      const { data } = await createTodo({
        title: '新建待办',
        content: ''
      })
      // 更新状态
      setTodo(data)
      // 跳转到详情页
      navigate(`/todo/${data.id}`)
    } catch (error) {
      console.error('创建待办失败:', error)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        {isEditing ? (
          <Input
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className="text-xl font-bold"
          />
        ) : (
          <h1 className="text-xl font-bold">{todo.title}</h1>
        )}
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '保存' : '编辑'}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        {isEditing ? (
          <textarea
            value={todo.content}
            onChange={(e) => setTodo({ ...todo, content: e.target.value })}
            className="w-full h-full p-4 border rounded-lg"
          />
        ) : (
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
            {todo.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
}

export default TodoDetail 