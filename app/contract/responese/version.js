/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  VersionShowResponse: {
    ...base.BaseResponse,
    data: { type: 'Version', required: true },
  },
  VersionListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'Version', required: true },
  },
};
