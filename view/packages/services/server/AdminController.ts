// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/admin/db-init */
export async function AdminControllerInit(options?: { [key: string]: any }) {
  return request<Server.ResultResponse>('/api/admin/db-init', {
    method: 'GET',
    ...(options || {}),
  });
}
