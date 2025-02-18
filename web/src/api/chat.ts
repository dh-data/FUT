import axios from '@/api/index'
import type { AxiosResponse } from 'axios'
// 会话列表

/**
 * 会话列表
 * @param params
 * @returns {Promise<AxiosResponse<ResultsData<any>>>}
 */
export const getChatList = (): Promise<AxiosResponse<any>> => {
  return axios.get('/chat')
}
