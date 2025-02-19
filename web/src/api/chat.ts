import axios from '@/api/index'
import type { AxiosResponse } from 'axios'
// 会话列表

/**
 * 获取用户会话列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */

export const getUserChatList = (): Promise<AxiosResponse<any>> => {
  return axios.get('/chat')
}

/**
 * 创建新的会话

 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createChat = (): Promise<AxiosResponse<any>> => {
  return axios.post('/chat')
}

/**
 * 删除会话
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteChat = (id: string): Promise<AxiosResponse<any>> => {
  return axios.delete(`/chat/${id}`)
}

/**
 * 查询会话消息列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getChatMessageList = (
  chatId: string
): Promise<AxiosResponse<any>> => {
  return axios.get(`/chat/${chatId}`)
}

/**
 * 发送聊天消息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const sendChatMessage = (params: {
  prompt: string
}): Promise<AxiosResponse<any>> => {
  return axios.post('/chat', params)
}

/**
 * 更新会话信息
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateChatInfo = (params: {
  title: string | undefined
  content: string
}): Promise<AxiosResponse<any>> => {
  return axios.put('/chat', params)
}
