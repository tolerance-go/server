/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const { ResponseBase } = require('../../constants/dto');

module.exports = {
  LicenseRsp: {
    ...ResponseBase,
    data: { type: 'License', required: true },
  },
  LicenseListRsp: {
    ...ResponseBase,
    data: { type: 'array', itemType: 'License', required: true },
  },
  LicenseListAndCountRspData: {
    count: {
      type: 'integer',
      required: true,
    },
    rows: {
      type: 'array',
      itemType: 'License',
      required: true,
    },
  },
  LicenseListAndCountRsp: {
    ...ResponseBase,
    data: {
      type: 'LicenseListAndCountRspData',
      required: true,
    },
  },
};
