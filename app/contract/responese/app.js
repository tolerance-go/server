/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  AppShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownApp', required: true },
  },
  AppListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownApp', required: true },
  },
  AppIncludeUserListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownAppIncludeUser', required: true },
  },
};
