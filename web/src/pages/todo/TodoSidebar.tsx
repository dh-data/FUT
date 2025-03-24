import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Search, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getTodoList, createTodo, TodoItem } from '@/api/todo'
import { ThemeToggle } from '@/components/ThemeToggle'
import dayjs from 'dayjs'

const TodoSidebar = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchText, setSearchText] = useState('')
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const { data } = await getTodoList()
      setTodos(data)
      // 如果没有选中的待办，且列表不为空，则选中第一个
      if (!id && data.length > 0) {
        navigate(`/todo/${data[0].id}`)
      }
    } catch (error) {
      console.error('获取待办事项失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleTodoClick = (id: string) => {
    navigate(`/todo/${id}`)
  }

  const handleAddTodo = async () => {
    try {
      setLoading(true)
      const { data } = await createTodo({
        title: '新建待办',
        content: '# 新建待办\n\n开始编写你的待办事项...'
      })
      await fetchTodos() // 重新获取列表
      navigate(`/todo/${data.id}`)
    } catch (error) {
      console.error('创建待办失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return dayjs(date).format('YYYYY-MM-DD HH:mm')
  }

  return (
    <div className="w-[280px] border-r h-full flex flex-col bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-white">待办事项</h2>
          <ThemeToggle />
        </div>
        <Button 
          onClick={handleAddTodo}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          <Plus className="mr-2 h-4 w-4" />
          新建待办
        </Button>
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="搜索待办..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9 pr-4 bg-white dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FileText className="h-12 w-12 mb-2 opacity-40" />
            <p>暂无待办事项</p>
            <Button
              variant="link"
              onClick={handleAddTodo}
              className="mt-2 text-blue-500 hover:text-blue-600"
            >
              创建一个新的待办
            </Button>
          </div>
        ) : (
          <div className="px-2">
            {todos
              .filter(todo => 
                todo.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map(todo => (
                <div
                  key={todo.id}
                  onClick={() => handleTodoClick(todo.id)}
                  className={`p-3 my-1 rounded-lg cursor-pointer transition-all
                    ${id === todo.id 
                      ? 'bg-white dark:bg-gray-800 shadow-sm' 
                      : 'hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm'
                    }`}
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium dark:text-gray-200 line-clamp-2">
                      {todo.title}
                    </h3>
                    <span className="text-xs text-gray-400 text-right">
                      {formatDate(todo.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoSidebar 