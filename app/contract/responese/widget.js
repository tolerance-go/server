/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  WidgetRsp: {
    ...base.BaseRsp,
    data: { type: 'Widget', required: true },
  },
  WidgetListRsp: {
    ...base.BaseRsp,
    data: { type: 'array', itemType: 'Widget', required: true },
  },
  WidgetListAndCountRspData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'Widget',
      required: true,
    },
  },
  WidgetListAndCountRsp: {
    ...base.BaseRsp,
    data: {
      type: 'WidgetListAndCountRspData',
      required: true,
    },
  },
};
