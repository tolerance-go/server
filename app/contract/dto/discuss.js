'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mapValues } = require('lodash');

const Base = {
  title: { type: 'string', required: false },
  desc: { type: 'string', required: false },
  belongsToComStatId: { type: 'string', required: true },
  belongsToComId: { type: 'string', required: true },
  left: { type: 'number', required: true },
  top: { type: 'number', required: true },
  containerWidth: { type: 'number', required: true },
  containerHeight: { type: 'number', required: true },
  containerLeft: { type: 'number', required: true },
  containerTop: { type: 'number', required: true },
  pageId: { type: 'string', required: true },
  resolved: {
    type: 'boolean',
    required: false,
  },
};

module.exports = {
  Discuss: {
    id: { type: 'string', required: true },
    ...Base,
  },
  ShownDiscuss: {
    id: { type: 'string', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
    ...Base,
  },
  CreationDiscuss: {
    ...Base,
  },
  UpdationDiscuss: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
