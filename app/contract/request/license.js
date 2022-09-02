/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { Timestamp, Identity, UserId } = require('../../constants/dto');
const { License } = require('../dto/license');

module.exports = {
  LicenseCreateReqData: {
    ...omit(License, [
      ...Object.keys(Timestamp),
      ...Object.keys(Identity),
      ...Object.keys(UserId),
    ]),
  },
  LicenseUpdateReqData: {
    ...mapValues(License, (item) => ({ ...item, required: false })),
  },
};
