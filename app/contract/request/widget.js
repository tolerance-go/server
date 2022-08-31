/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { Widget } = require('../dto/widget');

module.exports = {
  WidgetCreateReqData: {
    ...omit(Widget, ['id']),
  },
  WidgetUpdateReqData: {
    ...mapValues(Widget, (item) => ({ ...item, required: false })),
  },
};
