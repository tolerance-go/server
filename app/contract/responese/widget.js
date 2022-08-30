/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  WidgetShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownWidget', required: true },
  },
  WidgetListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownWidget', required: true },
  },
  WidgetListAndCountData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'ShownWidget',
      required: true,
    },
  },
  WidgetListAndCountResponse: {
    ...base.BaseResponse,
    data: {
      type: 'WidgetListAndCountData',
      required: true,
    },
  },
};
