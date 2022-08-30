/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues } = require('lodash');
const { Identity, Timestamp } = require('../../constants/dto');

const Base = {
  name: { type: 'string', required: true },
  elementType: { type: 'string', required: true },
  type: { type: 'string', required: true },
  desc: { type: 'string', required: false },
  labels: { type: 'array', itemType: 'string', required: false },
  licenseId: { type: 'string', required: false },
};

const ShownWidget = {
  ...Timestamp,
  ...Identity,
  ...Base,
};

module.exports = {
  Widget: {
    ...Identity,
    ...Base,
  },
  ShownWidget,
  CreationWidget: {
    ...Base,
  },
  UpdationWidget: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
