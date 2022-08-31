/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { WidgetLib } = require('../dto/widgetLib');

module.exports = {
  WidgetLibCreateReqData: {
    ...omit(WidgetLib, ['id']),
  },
  WidgetLibUpdateReqData: {
    ...mapValues(WidgetLib, (item) => ({ ...item, required: false })),
  },
};
