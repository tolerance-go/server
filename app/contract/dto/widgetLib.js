/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { Identity, Timestamp } = require('../../constants/dto');

module.exports = {
  WidgetLib: {
    name: { type: 'string', required: true },
    widgetLibId: { type: 'string', required: false },
    userId: { type: 'string', required: false },
    type: { type: 'string', required: true },
    desc: { type: 'string', required: false },
    labels: { type: 'array', itemType: 'string', required: false },
    ...Identity,
    ...Timestamp,
  },
};
