/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  ComIheritRelationShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownComIheritRelation', required: true },
  },
  ComIheritRelationListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownComIheritRelation', required: true },
  },
};
