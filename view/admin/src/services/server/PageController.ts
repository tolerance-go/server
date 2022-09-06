// @ts-ignore
/* eslint-disable */
import { request } from '@/helpers/request';

/** 获取列表  描述  GET /api/pages */
export async function PageControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PageControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<API.PageListRsp>('/api/pages', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 page  POST /api/pages */
export async function PageControllerCreate(
  body: API.PageCreateReqData,
  options?: { [key: string]: any },
) {
  return request<API.PageRsp>('/api/pages', {
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
  params: API.PageControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PageRsp>(`/api/pages/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 page  PUT /api/pages/${param0} */
export async function PageControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PageControllerUpdateParams,
  body: API.PageUpdateReqData,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PageRsp>(`/api/pages/${param0}`, {
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
  params: API.PageControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.PageRsp>(`/api/pages/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/pages/bulkDestroy */
export async function PageControllerBulkDestroy(body: number[], options?: { [key: string]: any }) {
  return request<API.CountResponse>('/api/pages/bulkDestroy', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/pages/count */
export async function PageControllerCount(
  body: API.CountReqData,
  options?: { [key: string]: any },
) {
  return request<API.CountResponse>('/api/pages/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/pages/findAll */
export async function PageControllerFindAll(
  body: API.SearchReqData,
  options?: { [key: string]: any },
) {
  return request<API.PageListRsp>('/api/pages/findAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/pages/findAndCountAll */
export async function PageControllerFindAndCountAll(
  body: API.SearchReqData,
  options?: { [key: string]: any },
) {
  return request<API.PageListAndCountRsp>('/api/pages/findAndCountAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
