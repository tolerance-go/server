'use strict';

const Base = {
  success: { type: 'boolean', required: true },
  errorCode: { type: 'integer', required: false },
  errorMessage: { type: 'string', required: false },
  showType: { type: 'integer', required: false },
};

module.exports = {
  BaseResponse: {
    ...Base,
  },
  BaseRsp: {
    ...Base,
  },
  ResultResponse: {
    ...Base,
    data: {
      type: 'boolean',
      required: true,
    },
  },
  StringArrayResponse: {
    ...Base,
    data: {
      type: 'array',
      itemType: 'string',
      required: true,
    },
  },
  CountResponse: {
    ...Base,
    data: {
      type: 'integer',
      required: true,
    },
  },
  CounterResponse: {
    ...Base,
    data: {
      type: 'array',
      itemType: 'Counter',
      required: true,
    },
  },
};
