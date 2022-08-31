// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/comIheritRelations */
export async function ComIheritRelationControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.ComIheritRelationControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<Server.ComIheritRelationListResponse>('/api/comIheritRelations', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 data  POST /api/comIheritRelations */
export async function ComIheritRelationControllerCreate(
  body: Server.CreationComIheritRelation,
  options?: { [key: string]: any },
) {
  return request<Server.ComIheritRelationShowResponse>('/api/comIheritRelations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/comIheritRelations/${param0} */
export async function ComIheritRelationControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.ComIheritRelationControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.ComIheritRelationShowResponse>(`/api/comIheritRelations/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 data  PUT /api/comIheritRelations/${param0} */
export async function ComIheritRelationControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.ComIheritRelationControllerUpdateParams,
  body: Server.UpdationComIheritRelation,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.ComIheritRelationShowResponse>(`/api/comIheritRelations/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/comIheritRelations/${param0} */
export async function ComIheritRelationControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.ComIheritRelationControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.ComIheritRelationShowResponse>(`/api/comIheritRelations/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/everyComIheritRelations */
export async function ComIheritRelationControllerDestroyEvery(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<Server.ComIheritRelationListResponse>('/api/everyComIheritRelations', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
