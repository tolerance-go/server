/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  ReviewShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownReview', required: true },
  },
  ReviewListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownReview', required: true },
  },
  ReviewListAndCountData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'ShownReview',
      required: true,
    },
  },
  ReviewListAndCountResponse: {
    ...base.BaseResponse,
    data: {
      type: 'ReviewListAndCountData',
      required: true,
    },
  },
};
