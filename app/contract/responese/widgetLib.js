/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const { ResponseBase } = require('../../constants/dto');

module.exports = {
  WidgetLibRsp: {
    ...ResponseBase,
    data: { type: 'WidgetLib', required: true },
  },
  WidgetLibListRsp: {
    ...ResponseBase,
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
    ...ResponseBase,
    data: {
      type: 'WidgetLibListAndCountRspData',
      required: true,
    },
  },
};
