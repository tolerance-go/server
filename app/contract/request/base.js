/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  SearchReqData: {
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
