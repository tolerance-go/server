/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { Identity, Timestamp, UserId } = require('../../constants/dto');

module.exports = {
  License: {
    ...Timestamp,
    ...Identity,
    ...UserId,
    expiration: { type: 'string', required: false },
    widgetId: { type: 'string', required: false },
    widgetLibId: { type: 'string', required: false },
    widgetGroupId: { type: 'string', required: false },
  },
};
