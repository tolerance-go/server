/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues, omit } = require('lodash');
const { WidgetGroup } = require('../dto/widgetGroup');

module.exports = {
  WidgetGroupCreateReqData: {
    ...omit(WidgetGroup, ['id']),
  },
  WidgetGroupUpdateReqData: {
    ...mapValues(WidgetGroup, (item) => ({ ...item, required: false })),
  },
};
