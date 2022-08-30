/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  CommentShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownComment', required: true },
  },
  CommentListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownComment', required: true },
  },
};
