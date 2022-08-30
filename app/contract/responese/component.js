/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const base = require('./base');

module.exports = {
  CreationWithRelationComponentResponseData: {
    component: {
      type: 'ShownComponent',
      required: true,
    },
    comIheritRelation: {
      type: 'ShownComIheritRelation',
      required: true,
    },
  },
  ComponentShowResponse: {
    ...base.BaseResponse,
    data: { type: 'ShownComponent', required: true },
  },
  ComponentListResponse: {
    ...base.BaseResponse,
    data: { type: 'array', itemType: 'ShownComponent', required: true },
  },
  CreationWithRelationComponentResponse: {
    ...base.BaseResponse,
    data: {
      type: 'CreationWithRelationComponentResponseData',
      required: true,
    },
  },
};
