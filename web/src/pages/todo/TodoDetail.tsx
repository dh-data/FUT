import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getTodoDetail, updateTodo, deleteTodo, TodoItem } from '@/api/todo'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"

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

  const handleDelete = async () => {
    if (!id) return
    try {
      setLoading(true)
      await deleteTodo(id)
      navigate('/todo')
    } catch (error) {
      console.error('删除待办失败:', error)
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
          <div className="flex items-center gap-2">
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={loading}
              className="transition-colors"
            >
              {isEditing ? '保存' : '编辑'}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  disabled={loading}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认删除</AlertDialogTitle>
                  <AlertDialogDescription>
                    此操作将永久删除该待办事项，确定要继续吗？
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    删除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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