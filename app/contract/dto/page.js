/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { Timestamp, Identity } = require('../../constants/dto');
const { mapValues } = require('lodash');

const Base = {
  path: { type: 'string', required: true },
  appId: { type: 'string', required: true },
  versionId: { type: 'string', required: false },
  stage_data: { type: 'string', required: false },

  nodesStructures: { type: 'PlainObject', required: false },
  nodesStyles: { type: 'PlainObject', required: false },
  nodesSettings: { type: 'PlainObject', required: false },
  nodesEvents: { type: 'PlainObject', required: false },
  nodesActions: { type: 'PlainObject', required: false },
  nodesStatus: { type: 'PlainObject', required: false },
  nodesStatusRelations: { type: 'PlainObject', required: false },
  nodesDefaultsStatus: { type: 'PlainObject', required: false },
};

module.exports = {
  Page: {
    id: { type: 'string', required: true },
    ...Base,
  },
  ShownPage: {
    ...Timestamp,
    ...Identity,
    ...Base,
  },
  CreationPage: {
    ...Base,
  },
  UpdationPage: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
