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
};
