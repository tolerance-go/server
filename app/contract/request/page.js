/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { Timestamp, Identity, UserId } = require('../../constants/dto');
const { Page } = require('../dto/page');

module.exports = {
  PageCreateReqData: {
    ...omit(Page, [
      ...Object.keys(Timestamp),
      ...Object.keys(Identity),
      ...Object.keys(UserId),
    ]),
  },
  PageUpdateReqData: {
    ...mapValues(omit(Page, Object.keys(Identity)), (item) => ({
      ...item,
      required: false,
    })),
  },
};
