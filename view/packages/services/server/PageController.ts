// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/pages */
export async function PageControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.PageControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<Server.PageListResponse>('/api/pages', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 page  POST /api/pages */
export async function PageControllerCreate(
  body: Server.CreationPage,
  options?: { [key: string]: any },
) {
  return request<Server.PageShowResponse>('/api/pages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/pages/${param0} */
export async function PageControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.PageControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.PageShowResponse>(`/api/pages/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 page  PUT /api/pages/${param0} */
export async function PageControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.PageControllerUpdateParams,
  body: Server.UpdationPage,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.PageShowResponse>(`/api/pages/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/pages/${param0} */
export async function PageControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.PageControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.PageShowResponse>(`/api/pages/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
