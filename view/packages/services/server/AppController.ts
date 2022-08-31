// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/apps */
export async function AppControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.AppControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<Server.AppListResponse>('/api/apps', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 app  POST /api/apps */
export async function AppControllerCreate(
  body: Server.CreationApp,
  options?: { [key: string]: any },
) {
  return request<Server.AppShowResponse>('/api/apps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  描述  GET /api/apps-include-user */
export async function AppControllerIndexIncludeUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.AppControllerIndexIncludeUserParams,
  options?: { [key: string]: any },
) {
  return request<Server.AppIncludeUserListResponse>('/api/apps-include-user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 将 app 分享给其他用户  POST /api/apps-share */
export async function AppControllerShareToUser(
  body: Server.ShareAppRequest,
  options?: { [key: string]: any },
) {
  return request<Server.ResultResponse>('/api/apps-share', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/apps/${param0} */
export async function AppControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.AppControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.AppShowResponse>(`/api/apps/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/apps/${param0} */
export async function AppControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.AppControllerUpdateParams,
  body: Server.UpdationApp,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.AppShowResponse>(`/api/apps/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/apps/${param0} */
export async function AppControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.AppControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.AppShowResponse>(`/api/apps/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/apps/${param0}/history */
export async function AppControllerUpdateHistory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.AppControllerUpdateHistoryParams,
  body: string,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.AppShowResponse>(`/api/apps/${param0}/history`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/apps/${param0}/stage-size */
export async function AppControllerUpdateStageSize(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.AppControllerUpdateStageSizeParams,
  body: string,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.AppShowResponse>(`/api/apps/${param0}/stage-size`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/everyApp */
export async function AppControllerBulkDestroy(body: number[], options?: { [key: string]: any }) {
  return request<Server.CountResponse>('/api/everyApp', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
