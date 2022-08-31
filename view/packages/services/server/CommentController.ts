// @ts-ignore
/* eslint-disable */
import { request } from 'helpers/request';

/** 获取列表  描述  GET /api/comments */
export async function CommentControllerIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.CommentControllerIndexParams,
  options?: { [key: string]: any },
) {
  return request<Server.CommentListResponse>('/api/comments', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建 data  POST /api/comments */
export async function CommentControllerCreate(
  body: Server.CreationComment,
  options?: { [key: string]: any },
) {
  return request<Server.CommentShowResponse>('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看  描述  GET /api/comments/${param0} */
export async function CommentControllerShow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.CommentControllerShowParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.CommentShowResponse>(`/api/comments/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新 data  PUT /api/comments/${param0} */
export async function CommentControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.CommentControllerUpdateParams,
  body: Server.UpdationComment,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.CommentShowResponse>(`/api/comments/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/comments/${param0} */
export async function CommentControllerDestroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Server.CommentControllerDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Server.CommentShowResponse>(`/api/comments/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 app  DELETE /api/every-comments */
export async function CommentControllerDestroyEvery(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<Server.CommentListResponse>('/api/every-comments', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
