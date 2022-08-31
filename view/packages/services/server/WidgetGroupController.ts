// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/widgetGroups */
export async function WidgetGroupControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.WidgetGroupControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<Server.WidgetListRsp>('/api/widgetGroups', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 app  POST /api/widgetGroups */
export async function WidgetGroupControllerCreate(
  body: Server.WidgetGroupCreateReqData,
  options?: { [key: string]: any },
) {
  return request<Server.WidgetGroupRsp>('/api/widgetGroups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/widgetGroups/${param0} */
export async function WidgetGroupControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.WidgetGroupControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.WidgetGroupRsp>(`/api/widgetGroups/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/widgetGroups/${param0} */
export async function WidgetGroupControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.WidgetGroupControllerUpdateParams,
  body: Server.WidgetGroupUpdateReqData,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.WidgetGroupRsp>(`/api/widgetGroups/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/widgetGroups/${param0} */
export async function WidgetGroupControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.WidgetGroupControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.WidgetGroupRsp>(`/api/widgetGroups/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/widgetGroups/bulkDestroy */
export async function WidgetGroupControllerBulkDestroy(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<Server.CountResponse>('/api/widgetGroups/bulkDestroy', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/widgetGroups/findAll */
export async function WidgetGroupControllerFindAll(
  body: Server.FindOptions,
  options?: { [key: string]: any },
) {
  return request<Server.WidgetListRsp>('/api/widgetGroups/findAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/widgetGroups/findAndCountAll */
export async function WidgetGroupControllerFindAndCountAll(
  body: Server.FindOptions,
  options?: { [key: string]: any },
) {
  return request<Server.WidgetGroupListAndCountRsp>('/api/widgetGroups/findAndCountAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}