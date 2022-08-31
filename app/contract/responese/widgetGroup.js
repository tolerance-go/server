/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  WidgetGroupRsp: {
    ...base.BaseRsp,
    data: { type: 'WidgetGroup', required: true },
  },
  WidgetGroupListRsp: {
    ...base.BaseRsp,
    data: { type: 'array', itemType: 'WidgetGroup', required: true },
  },
  WidgetGroupListAndCountRspData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'WidgetGroup',
      required: true,
    },
  },
  WidgetGroupListAndCountRsp: {
    ...base.BaseRsp,
    data: {
      type: 'WidgetGroupListAndCountRspData',
      required: true,
    },
  },
};
