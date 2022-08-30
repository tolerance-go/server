// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** 获取列表  描述  GET /api/reviews */
export async function ReviewControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ReviewControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<API.ReviewListResponse>('/api/reviews', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 app  POST /api/reviews */
export async function ReviewControllerCreate(
  body: API.CreationReview,
  options?: { [key: string]: any },
) {
  return request<API.ReviewShowResponse>('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/reviews/${param0} */
export async function ReviewControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ReviewControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ReviewShowResponse>(`/api/reviews/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/reviews/${param0} */
export async function ReviewControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ReviewControllerUpdateParams,
  body: API.UpdationReview,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ReviewShowResponse>(`/api/reviews/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/reviews/${param0} */
export async function ReviewControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ReviewControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ReviewShowResponse>(`/api/reviews/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/reviews/bulkDestroy */
export async function ReviewControllerBulkDestroy(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.CountResponse>('/api/reviews/bulkDestroy', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/reviews/findAll */
export async function ReviewControllerFindAll(
  body: API.FindOptions,
  options?: { [key: string]: any },
) {
  return request<API.ReviewListResponse>('/api/reviews/findAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/reviews/findAndCountAll */
export async function ReviewControllerFindAndCountAll(
  body: API.FindOptions,
  options?: { [key: string]: any },
) {
  return request<API.ReviewListAndCountResponse>('/api/reviews/findAndCountAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
