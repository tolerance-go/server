/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  PageShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownPage', required: true },
  },
  PageListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownPage', required: true },
  },
};
