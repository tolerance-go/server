/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { Identity } = require('../../constants/dto');

module.exports = {
  Counter: {
    ...Identity,
    count: { type: 'integer', required: true },
  },
  Identity: {
    ...Identity,
  },
  Identities: {
    id: { type: 'array', itemType: 'string', required: true },
  },
  PlainObject: {},
  FindOptions: {
    order: {
      type: 'array',
      itemType: 'OrderItem',
      required: false,
    },
    limit: {
      type: 'integer',
      required: false,
    },
    offset: {
      type: 'integer',
      required: false,
    },
    wheres: {
      type: 'Wheres',
      required: false,
    },
    includes: {
      type: 'array',
      itemType: 'Include',
      required: false,
    },
  },
};
