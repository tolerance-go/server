/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  UserShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownUser', required: true },
  },
  UserListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownUser', required: true },
  },
};
