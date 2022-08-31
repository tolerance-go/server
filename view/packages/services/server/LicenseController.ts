// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/license */
export async function LicenseControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.LicenseControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<Server.LicenseListResponse>('/api/license', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/license/findAll */
export async function LicenseControllerFindAll(
  body: Server.FindOptions,
  options?: { [key: string]: any },
) {
  return request<Server.LicenseListResponse>('/api/license/findAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取列表  获取列表  POST /api/license/findAndCountAll */
export async function LicenseControllerFindAndCountAll(
  body: Server.FindOptions,
  options?: { [key: string]: any },
) {
  return request<Server.LicenseListAndCountResponse>('/api/license/findAndCountAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建 app  POST /api/licenses */
export async function LicenseControllerCreate(
  body: Server.CreationLicense,
  options?: { [key: string]: any },
) {
  return request<Server.LicenseShowResponse>('/api/licenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/licenses/${param0} */
export async function LicenseControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.LicenseControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.LicenseShowResponse>(`/api/licenses/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 app  PUT /api/licenses/${param0} */
export async function LicenseControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.LicenseControllerUpdateParams,
  body: Server.UpdationLicense,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.LicenseShowResponse>(`/api/licenses/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/licenses/${param0} */
export async function LicenseControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.LicenseControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.LicenseShowResponse>(`/api/licenses/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/licenses/bulkDestroy */
export async function LicenseControllerBulkDestroy(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<Server.CountResponse>('/api/licenses/bulkDestroy', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
