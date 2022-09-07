// @ts-ignore
/* eslint-disable */
import { request } from '@fenxing/common/helpers/request';

/** 获取列表  描述  GET /api/widgetLibs */
export async function WidgetLibControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetLibControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<API.WidgetLibListRsp>('/api/widgetLibs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 app  POST /api/widgetLibs */
export async function WidgetLibControllerCreate(
  body: API.WidgetLibCreateReqData,
  options?: { [key: string]: any },
) {
  return request<API.WidgetLibRsp>('/api/widgetLibs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/widgetLibs/${param0} */
export async function WidgetLibControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetLibControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WidgetLibRsp>(`/api/widgetLibs/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/widgetLibs/${param0} */
export async function WidgetLibControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetLibControllerUpdateParams,
  body: API.WidgetLibUpdateReqData,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WidgetLibRsp>(`/api/widgetLibs/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/widgetLibs/${param0} */
export async function WidgetLibControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WidgetLibControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WidgetLibRsp>(`/api/widgetLibs/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/widgetLibs/bulkDestroy */
export async function WidgetLibControllerBulkDestroy(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.CountResponse>('/api/widgetLibs/bulkDestroy', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/widgetLibs/count */
export async function WidgetLibControllerCount(
  body: API.CountReqData,
  options?: { [key: string]: any },
) {
  return request<API.CountResponse>('/api/widgetLibs/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/widgetLibs/findAll */
export async function WidgetLibControllerFindAll(
  body: API.SearchReqData,
  options?: { [key: string]: any },
) {
  return request<API.WidgetLibListRsp>('/api/widgetLibs/findAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/widgetLibs/findAndCountAll */
export async function WidgetLibControllerFindAndCountAll(
  body: API.SearchReqData,
  options?: { [key: string]: any },
) {
  return request<API.WidgetLibListAndCountRsp>('/api/widgetLibs/findAndCountAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
