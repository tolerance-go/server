/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const { ResponseBase } = require('../../constants/dto');

module.exports = {
  WidgetRsp: {
    ...ResponseBase,
    data: { type: 'Widget', required: true },
  },
  WidgetListRsp: {
    ...ResponseBase,
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
    ...ResponseBase,
    data: {
      type: 'WidgetListAndCountRspData',
      required: true,
    },
  },
};
