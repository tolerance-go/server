/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { WidgetLib } = require('../dto/widgetLib');
const { Timestamp, Identity, UserId } = require('../../constants/dto');

module.exports = {
  WidgetLibCreateReqData: {
    ...omit(WidgetLib, [
      ...Object.keys(Timestamp),
      ...Object.keys(Identity),
      ...Object.keys(UserId),
    ]),
  },
  WidgetLibUpdateReqData: {
    ...mapValues(omit(WidgetLib, Object.keys(Identity)), (item) => ({
      ...item,
      required: false,
    })),
  },
};
