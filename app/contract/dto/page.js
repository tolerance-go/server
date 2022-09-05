/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { Timestamp, Identity } = require('../../constants/dto');

module.exports = {
  Page: {
    path: { type: 'string', required: true },
    appId: { type: 'string', required: true },
    versionId: { type: 'string', required: false },
    stage_data: { type: 'string', required: false },
    nodesStructures: { type: 'string', required: false },
    nodesStyles: { type: 'string', required: false },
    nodesSettings: { type: 'string', required: false },
    nodesEvents: { type: 'string', required: false },
    nodesActions: { type: 'string', required: false },
    nodesStatus: { type: 'string', required: false },
    nodesStatusRelations: { type: 'string', required: false },
    nodesDefaultsStatus: { type: 'string', required: false },
    stageRootNodeIds: { type: 'string', required: false },
    ...Identity,
    ...Timestamp,
  },
};
