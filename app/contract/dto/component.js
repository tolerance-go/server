'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pick } = require('lodash');

const Base = {
  name: { type: 'string', required: true },
  desc: { type: 'string', required: false },
  app_id: { type: 'string', required: true },
  stage_data: { type: 'string', required: false },
  comIheritRelationId: { type: 'integer', required: false },
  usedInPageIds: { type: 'array', itemType: 'integer', required: false },
};

module.exports = {
  Component: {
    id: { type: 'string', required: true },
    ...Base,
  },
  ShownComponent: {
    id: { type: 'string', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
    ...Base,
  },
  CreationComponent: {
    ...Base,
  },
  CreationWithRelationComponent: {
    fromComId: { type: 'string', required: true },
    appId: { type: 'string', required: true },
    ...pick(Base, ['name', 'desc']),
  },
};
