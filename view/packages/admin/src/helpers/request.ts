import { PATHS } from '@/constants/path';
import { history } from '@umijs/max';
import { message, notification, Typography } from 'antd';
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react';
import appendQueryStrToPath from './appendQueryStrToPath';

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  WARN_NOTIFICATION = 4,
  ERROR_NOTIFICATION = 5,
  REDIRECT = 9,
}

const getNotificationDescEle = (errorContent: string) => {
  return errorContent
    ? React.createElement(
        Typography.Paragraph,
        {
          type: 'secondary',
          ellipsis: {
            rows: 2,
            expandable: true,
          },
          copyable: true,
        },
        JSON.stringify(errorContent),
      )
    : null;
};

const noticeServerErrorMessage = (
  errorInfo: ServerResponseData | undefined,
) => {
  if (errorInfo) {
    const { errorMessage, data } = errorInfo;

    switch (errorInfo.showType) {
      case ErrorShowType.SILENT:
        // do nothing
        break;
      case ErrorShowType.WARN_MESSAGE:
        message.warn(errorMessage);
        break;
      case ErrorShowType.ERROR_MESSAGE:
        message.error(errorMessage);
        break;
      case ErrorShowType.WARN_NOTIFICATION:
        notification.warn({
          message: errorMessage,
          description: getNotificationDescEle(data),
        });
        break;
      case ErrorShowType.ERROR_NOTIFICATION:
        notification.error({
          message: errorMessage,
          description: getNotificationDescEle(data),
        });
        break;
      case ErrorShowType.REDIRECT:
        // TODO: redirect
        break;
      default:
        message.error(errorMessage);
    }
  }
};

type ServerResponseStructure = {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
};

// 与后端约定的响应数据格式
type ServerResponseData = ServerResponseStructure | any;

type RequestConfigs = {
  // 跳过服务器错误处理
  skipServerErrorHandle?: boolean;
  // 跳过网络错误处理
  skipNetworkErrorHandle?: boolean;
};

type ResponseConfig = AxiosRequestConfig & RequestConfigs;

axios.interceptors.response.use(
  (response: AxiosResponse<ServerResponseData>) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    /** 服务器业务错误 */
    if (typeof response.data === 'object' && response.data.success === false) {
      if ((response.config as ResponseConfig).skipServerErrorHandle) {
        return response;
      }

      noticeServerErrorMessage(response.data);

      const customError = new Error(response.data.errorMessage);
      customError.name = String(response.data.errorCode);
      return Promise.reject(customError);
    }

    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response) {
      const response: Response | AxiosResponse = error.response;

      if (axios.isAxiosError(error)) {
        if ((error.response.config as ResponseConfig).skipNetworkErrorHandle) {
          return Promise.reject(error);
        }
      }

      // Axios 的错误
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      notification.error({
        message: `服务器内部错误: ${response.status}`,
        description: response.statusText,
      });

      if (response.status === 401) {
        history.push(
          appendQueryStrToPath(PATHS.LOGIN, {
            // 从什么页面退出
            // https://github.com/umijs/umi/issues/9207
            quitFrom: window.location.pathname,
          }),
        );
      }
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      message.error('请求已经成功发起，但没有收到响应，请重试');
    } else {
      message.error('发送请求时出了点问题，请重试');
    }

    return Promise.reject(error);
  },
);

export function request<T extends ServerResponseData>(
  url: string,
  opts: AxiosRequestConfig & {
    getResponse: true;
  },
): AxiosPromise<T extends ServerResponseStructure ? T['data'] : T>;
export function request<T extends ServerResponseData>(
  url: string,
  opts: AxiosRequestConfig & {
    alwaysServerStructure: true;
  },
): Promise<T>;
export function request<T extends ServerResponseData>(
  url: string,
  opts: AxiosRequestConfig,
): Promise<T extends ServerResponseStructure ? T['data'] : T>;
export function request<T extends ServerResponseData>(
  url: string,
  opts: AxiosRequestConfig & {
    /** 如果为 true，则返回带 responese 的相关数据 */
    getResponse?: boolean;
    /** 如果为 true 的话，则表示始终返回服务器约定结构数据，哪怕是网络错误的情况 */
    alwaysServerStructure?: boolean;
  },
) {
  return axios(url, opts)
    .then((response: AxiosResponse<T>) => {
      if (opts.alwaysServerStructure) {
        return {
          success: true,
          data: response.data,
        };
      }

      if (opts.getResponse) {
        return response;
      }

      return response.data;
    })
    .catch((error) => {
      if (opts.alwaysServerStructure) {
        return {
          success: false,
        } as ServerResponseStructure;
      }

      throw error;
    });
}
