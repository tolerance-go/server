/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues } = require('lodash');
const { Identity, Timestamp } = require('../../constants/dto');

const Base = {
  name: { type: 'string', required: true },
  widgetLibId: { type: 'string', required: false },
  userId: { type: 'string', required: false },
  type: { type: 'string', required: true },
  desc: { type: 'string', required: false },
  labels: { type: 'array', itemType: 'string', required: false },
  licenseId: { type: 'string', required: false },
};

const ShownWidgetLib = {
  ...Timestamp,
  ...Identity,
  ...Base,
};

module.exports = {
  WidgetLib: {
    ...Identity,
    ...Base,
  },
  ShownWidgetLib,
  CreationWidgetLib: {
    ...Base,
  },
  UpdationWidgetLib: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
