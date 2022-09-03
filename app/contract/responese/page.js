/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const { ResponseBase } = require('../../constants/dto');

module.exports = {
  PageRsp: {
    ...ResponseBase,
    data: { type: 'Page', required: true },
  },
  PageListRsp: {
    ...ResponseBase,
    data: { type: 'array', itemType: 'Page', required: true },
  },
  PageListAndCountRspData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'Page',
      required: true,
    },
  },
  PageListAndCountRsp: {
    ...ResponseBase,
    data: {
      type: 'PageListAndCountRspData',
      required: true,
    },
  },
};
