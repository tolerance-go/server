/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const { ResponseBase } = require('../../constants/dto');

module.exports = {
  WidgetGroupRsp: {
    ...ResponseBase,
    data: { type: 'WidgetGroup', required: true },
  },
  WidgetGroupListRsp: {
    ...ResponseBase,
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
    ...ResponseBase,
    data: {
      type: 'WidgetGroupListAndCountRspData',
      required: true,
    },
  },
};
