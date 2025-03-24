import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getTodoDetail, updateTodo, TodoItem } from '@/api/todo'

const TodoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [todo, setTodo] = useState<TodoItem | null>(null)

  const fetchTodoDetail = async () => {
    if (!id) return
    try {
      setLoading(true)
      const { data } = await getTodoDetail(id)
      setTodo(data)
    } catch (error) {
      console.error('获取待办详情失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodoDetail()
  }, [id])

  const handleSave = async () => {
    if (!todo || !id) return
    try {
      setLoading(true)
      await updateTodo(id, {
        title: todo.title,
        content: todo.content
      })
      setIsEditing(false)
    } catch (error) {
      console.error('更新待办失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  if (!todo) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        请选择或创建一个待办事项
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="border-b p-4 flex items-center justify-between bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
          {isEditing ? (
            <Input
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              className="text-xl font-bold max-w-xl dark:bg-gray-800 dark:text-white"
            />
          ) : (
            <h1 className="text-xl font-bold dark:text-white">{todo.title}</h1>
          )}
          <div className="space-x-2">
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={loading}
              className="transition-colors"
            >
              {isEditing ? '保存' : '编辑'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 bg-white dark:bg-gray-800 min-h-full">
          {isEditing ? (
            <div className="h-[calc(100vh-12rem)]">
              <textarea
                value={todo.content}
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
                className="w-full h-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 
                  dark:text-white resize-none transition-all"
              />
            </div>
          ) : (
            <article className="prose prose-blue max-w-none dark:prose-invert">
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
                        className="rounded-lg !bg-gray-900 dark:!bg-gray-800"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={`${className} bg-gray-100 dark:bg-gray-800 rounded px-1`} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {todo.content}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoDetail 