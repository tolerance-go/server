// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/versions */
export async function VersionControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.VersionControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<Server.VersionListResponse>('/api/versions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 version  POST /api/versions */
export async function VersionControllerCreate(
  body: Server.CreationVersion,
  options?: { [key: string]: any },
) {
  return request<Server.VersionShowResponse>('/api/versions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/versions/${param0} */
export async function VersionControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.VersionControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.VersionShowResponse>(`/api/versions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 page  PUT /api/versions/${param0} */
export async function VersionControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.VersionControllerUpdateParams,
  body: string,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.BaseResponse>(`/api/versions/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/versions/${param0} */
export async function VersionControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.VersionControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.VersionShowResponse>(`/api/versions/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
