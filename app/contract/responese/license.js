/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  LicenseShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownLicense', required: true },
  },
  LicenseListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownLicense', required: true },
  },
  LicenseListAndCountData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'ShownLicense',
      required: true,
    },
  },
  LicenseListAndCountResponse: {
    ...base.BaseResponse,
    data: {
      type: 'LicenseListAndCountData',
      required: true,
    },
  },
};
