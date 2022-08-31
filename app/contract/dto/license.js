/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues } = require('lodash');
const { Identity, Timestamp } = require('../../constants/dto');

const Base = {
  expiration: { type: 'string', required: false },
  widgetId: { type: 'string', required: false },
  widgetLibId: { type: 'string', required: false },
  widgetGroupId: { type: 'string', required: false },
};

const ShownLicense = {
  ...Timestamp,
  ...Identity,
  ...Base,
  userId: { type: 'string', required: true },
};

module.exports = {
  License: {
    ...Identity,
    ...Base,
  },
  ShownLicense,
  CreationLicense: {
    ...Base,
  },
  UpdationLicense: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
