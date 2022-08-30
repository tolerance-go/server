// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** 获取列表  描述  GET /api/admin/db-init */
export async function AdminControllerInit(options?: { [key: string]: any }) {
  return request<API.ResultResponse>('/api/admin/db-init', {
    method: 'GET',
    ...(options || {}),
  });
}
