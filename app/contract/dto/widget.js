/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { Identity, Timestamp } = require('../../constants/dto');

module.exports = {
  Widget: {
    name: { type: 'string', required: true },
    elementType: { type: 'string', required: true },
    type: { type: 'string', required: true },
    desc: { type: 'string', required: false },
    labels: { type: 'array', itemType: 'string', required: false },
    ...Identity,
    ...Timestamp,
  },
};
