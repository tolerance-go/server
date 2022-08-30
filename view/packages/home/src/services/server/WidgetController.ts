// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** 获取列表  描述  GET /api/widgets */
export async function WidgetControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<API.WidgetListResponse>('/api/widgets', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 app  POST /api/widgets */
export async function WidgetControllerCreate(
  body: API.CreationWidget,
  options?: { [key: string]: any },
) {
  return request<API.WidgetShowResponse>('/api/widgets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/widgets/${param0} */
export async function WidgetControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WidgetShowResponse>(`/api/widgets/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/widgets/${param0} */
export async function WidgetControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetControllerUpdateParams,
  body: API.UpdationWidget,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WidgetShowResponse>(`/api/widgets/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/widgets/${param0} */
export async function WidgetControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WidgetShowResponse>(`/api/widgets/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/widgets/bulkDestroy */
export async function WidgetControllerBulkDestroy(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.CountResponse>('/api/widgets/bulkDestroy', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/widgets/findAll */
export async function WidgetControllerFindAll(
  body: API.FindOptions,
  options?: { [key: string]: any },
) {
  return request<API.WidgetListResponse>('/api/widgets/findAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/widgets/findAndCountAll */
export async function WidgetControllerFindAndCountAll(
  body: API.FindOptions,
  options?: { [key: string]: any },
) {
  return request<API.WidgetListAndCountResponse>('/api/widgets/findAndCountAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
