/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  DatabaseShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownDatabase', required: true },
  },
  DatabaseListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownDatabase', required: true },
  },
};
