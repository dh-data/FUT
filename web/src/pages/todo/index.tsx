import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TodoSidebar from './TodoSidebar'

const TodoList = () => {
  return (
    <div className="flex h-screen">
      <TodoSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default TodoList 