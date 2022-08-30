/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  WidgetGroupShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownWidgetGroup', required: true },
  },
  WidgetGroupListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownWidgetGroup', required: true },
  },
  WidgetGroupListAndCountData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'ShownWidgetGroup',
      required: true,
    },
  },
  WidgetGroupListAndCountResponse: {
    ...base.BaseResponse,
    data: {
      type: 'WidgetGroupListAndCountData',
      required: true,
    },
  },
};
