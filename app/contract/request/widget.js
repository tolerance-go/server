/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { Widget } = require('../dto/widget');
const { Timestamp, Identity, UserId } = require('../../constants/dto');

module.exports = {
  WidgetCreateReqData: {
    ...omit(Widget, [
      ...Object.keys(Timestamp),
      ...Object.keys(Identity),
      ...Object.keys(UserId),
    ]),
  },
  WidgetUpdateReqData: {
    ...mapValues(omit(Widget, Object.keys(Identity)), (item) => ({
      ...item,
      required: false,
    })),
  },
};
