/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues } = require('lodash');
const { Identity, Timestamp } = require('../../constants/dto');

const Base = {
  appId: { type: 'string', required: true },
  componentId: { type: 'string', required: true },
  fromId: { type: 'string', required: true },
  toId: { type: 'string', required: true },
};

module.exports = {
  ComIheritRelation: {
    ...Identity,
    ...Base,
  },
  ShownComIheritRelation: {
    ...Timestamp,
    ...Identity,
    ...Base,
  },
  CreationComIheritRelation: {
    ...Base,
  },
  UpdationComIheritRelation: {
    ...mapValues(Base, (item) => ({
      ...item,
      required: false,
    })),
  },
};
