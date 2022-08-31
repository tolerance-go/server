/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues } = require('lodash');
const { Identity, Timestamp } = require('../../constants/dto');

const Base = {
  title: { type: 'string', required: true },
  desc: { type: 'string', required: false },
  appData: { type: 'string', required: false },
  historyData: { type: 'string', required: false },
  stageSizeData: { type: 'string', required: false },
  labels: { type: 'array', itemType: 'string', required: false },
};

const ShownApp = {
  userId: { type: 'string', required: true },
  ...Timestamp,
  ...Identity,
  ...Base,
};

module.exports = {
  ShownAppIncludeUser: {
    ...ShownApp,
    users: { type: 'array', itemType: 'ShownUser', required: true },
  },
  App: {
    ...Identity,
    ...Base,
  },
  ShownApp,
  CreationApp: {
    ...Base,
  },
  UpdationApp: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
  ShareAppRequest: {
    userIds: {
      type: 'array',
      itemType: 'string',
      required: true,
    },
    appId: {
      type: 'string',
      required: true,
    },
  },
};
