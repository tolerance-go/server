/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  WidgetLibRsp: {
    ...base.BaseRsp,
    data: { type: 'WidgetLib', required: true },
  },
  WidgetLibListRsp: {
    ...base.BaseRsp,
    data: { type: 'array', itemType: 'WidgetLib', required: true },
  },
  WidgetLibListAndCountRspData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'WidgetLib',
      required: true,
    },
  },
  WidgetLibListAndCountRsp: {
    ...base.BaseRsp,
    data: {
      type: 'WidgetLibListAndCountRspData',
      required: true,
    },
  },
};
