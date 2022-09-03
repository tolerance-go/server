/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { WidgetGroup } = require('../dto/widgetGroup');
const { Timestamp, Identity, UserId } = require('../../constants/dto');

module.exports = {
  WidgetGroupCreateReqData: {
    ...omit(WidgetGroup, [
      ...Object.keys(Timestamp),
      ...Object.keys(Identity),
      ...Object.keys(UserId),
    ]),
  },
  WidgetGroupUpdateReqData: {
    ...mapValues(omit(WidgetGroup, Object.keys(Identity)), (item) => ({
      ...item,
      required: false,
    })),
  },
};
