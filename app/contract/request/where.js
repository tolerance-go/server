/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  Conditions: {
    like: { type: 'string', required: false },
    notLike: { type: 'string', required: false },
    or: { type: 'array', itemType: 'Wheres', required: false },
    and: { type: 'array', itemType: 'Wheres', required: false },
    ne: { type: 'string', required: false },
    neNum: { type: 'number', required: false },
    is: { type: 'string', required: false },
    isNum: { type: 'number', required: false },
    eq: { type: 'string', required: false },
    eqNum: { type: 'number', required: false },
    not: { type: 'string', required: false },
    notNum: { type: 'number', required: false },
    in: { type: 'string', required: false },
    inNum: { type: 'number', required: false },
    notIn: { type: 'string', required: false },
    notInNum: { type: 'number', required: false },
    gt: { type: 'number', required: false },
    gte: { type: 'number', required: false },
    lt: { type: 'number', required: false },
    lte: { type: 'number', required: false },
    between: { type: 'array', itemType: 'number', required: false },
    notBetween: { type: 'array', itemType: 'number', required: false },
  },
  WhereItem: {
    fieldName: { type: 'string', required: true },
    conditions: {
      type: 'Conditions',
    },
  },
  Wheres: {
    where: {
      type: 'array',
      itemType: 'WhereItem',
      required: true,
    },
    or: {
      type: 'array',
      itemType: 'Wheres',
      required: false,
    },
    and: {
      type: 'array',
      itemType: 'Wheres',
      required: false,
    },
  },
};
