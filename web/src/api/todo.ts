import axios from '@/api/index'
import type { AxiosResponse } from 'axios'

// 待办事项接口类型定义
export interface TodoItem {
  id: string
  title: string
  content: string
  completed: boolean
  createdAt: string
}

/**
 * 获取待办事项列表
 * @returns {Promise<AxiosResponse<TodoItem[]>>}
 */
export const getTodoList = (): Promise<AxiosResponse<TodoItem[]>> => {
  return axios.get('/todos')
}

/**
 * 获取待办事项详情
 * @param id 待办事项ID
 * @returns {Promise<AxiosResponse<TodoItem>>}
 */
export const getTodoDetail = (id: string): Promise<AxiosResponse<TodoItem>> => {
  return axios.get(`/todos/${id}`)
}

/**
 * 创建待办事项
 * @param params 待办事项参数
 * @returns {Promise<AxiosResponse<TodoItem>>}
 */
export const createTodo = (params: {
  title: string
  content: string
  tags?: string[]
}): Promise<AxiosResponse<TodoItem>> => {
  return axios.post('/todos', params)
}

/**
 * 更新待办事项
 * @param id 待办事项ID
 * @param params 更新参数
 * @returns {Promise<AxiosResponse<TodoItem>>}
 */
export const updateTodo = (
  id: string,
  params: Partial<TodoItem>
): Promise<AxiosResponse<TodoItem>> => {
  return axios.put(`/todos/${id}`, params)
}

/**
 * 删除待办事项
 * @param id 待办事项ID
 * @returns {Promise<AxiosResponse<void>>}
 */
export const deleteTodo = (id: string): Promise<AxiosResponse<void>> => {
  return axios.delete(`/todos/${id}`)
}

/**
 * 更新待办事项完成状态
 * @param id 待办事项ID
 * @param completed 是否完成
 * @returns {Promise<AxiosResponse<TodoItem>>}
 */
export const updateTodoStatus = (
  id: string,
  completed: boolean
): Promise<AxiosResponse<TodoItem>> => {
  return axios.patch(`/todos/${id}/status`, { completed })
}
