/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  DiscussShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownDiscuss', required: true },
  },
  DiscussListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownDiscuss', required: true },
  },
};
