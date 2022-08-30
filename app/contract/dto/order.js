/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  OrderItem: {
    fieldName: { type: 'string', required: true },
    orderType: { type: 'string', required: true, enum: ['ASC', 'DESC'] },
  },
};
