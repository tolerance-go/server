/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  Include: {
    model: {
      type: 'string',
      required: true,
      enum: [
        'App',
        'AppUser',
        'Authorization',
        'ComIheritRelation',
        'Comment',
        'Component',
        'Database',
        'Discuss',
        'License',
        'Page',
        'User',
        'Version',
        'Widget',
        'WidgetGroup',
        'WidgetLib',
      ],
    },
    include: {
      type: 'array',
      itemType: 'Include',
      required: false,
    },
    wheres: {
      type: 'Wheres',
      required: false,
    },
  },
  Includes: {
    include: {
      type: 'array',
      itemType: 'Include',
      required: false,
    },
  },
};
