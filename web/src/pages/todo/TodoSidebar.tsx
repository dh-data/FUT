import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getTodoList, TodoItem } from '@/api/todo'

const TodoSidebar = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(false)
  const requestSentRef = useRef(false)

  useEffect(() => {
    const fetchTodos = async () => {
      if (requestSentRef.current) return; // 如果已经发送过请求，直接返回
      requestSentRef.current = true;

      try {
        setLoading(true)
        const data = await getTodoList()
        console.log(data)
        setTodos(data.data)
      } catch (error) {
        console.error('获取待办事项失败:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const handleTodoClick = (id: string) => {
    navigate(`/todo/${id}`)
  }

  const handleAddTodo = () => {
    // const newTodo = {
    //   id: Date.now().toString(),
    //   title: '新建待办',
    //   completed: false,
    //   createdAt: new Date().toISOString().split('T')[0]
    // }
    // setTodos([newTodo, ...todos])
    // navigate(`/todo/${newTodo.id}`)
  }

  return (
    <div className="w-[260px] border-r h-full flex flex-col">
      <div className="p-4">
        <Button 
          onClick={handleAddTodo}
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          新建待办
        </Button>
        {/* <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="搜索待办..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-8"
          />
        </div> */}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : todos
          .filter(todo => 
            todo.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map(todo => (
            <div
              key={todo.id}
              onClick={() => handleTodoClick(todo.id)}
              className="p-4 hover:bg-gray-100 cursor-pointer border-b"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{todo.title}</h3>
                <span className="text-sm text-gray-500">{todo.createdAt}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TodoSidebar 