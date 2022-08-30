/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  WidgetLibShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownWidgetLib', required: true },
  },
  WidgetLibListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownWidgetLib', required: true },
  },
  WidgetLibListAndCountData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'ShownWidgetLib',
      required: true,
    },
  },
  WidgetLibListAndCountResponse: {
    ...base.BaseResponse,
    data: {
      type: 'WidgetLibListAndCountData',
      required: true,
    },
  },
};
