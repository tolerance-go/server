/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues } = require('lodash');
const { Identity, Timestamp } = require('../../constants/dto');

const Base = {
  content: { type: 'string', required: true },
  rateNum: { type: 'string', required: true },
  userId: { type: 'string', required: false },
  reviewId: { type: 'string', required: false },
  widgetId: { type: 'string', required: false },
  widgetGroupId: { type: 'string', required: false },
  widgetLibId: { type: 'string', required: false },
};

const ShownReview = {
  ...Timestamp,
  ...Identity,
  ...Base,
};

module.exports = {
  Review: {
    ...Identity,
    ...Base,
  },
  ShownReview,
  CreationReview: {
    ...Base,
  },
  UpdationReview: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
