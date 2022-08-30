'use strict';

const Date = {
  created_at: { type: 'string', required: true },
  updated_at: { type: 'string', required: true },
};

const Base = {
  name: { type: 'string', required: true },
  app_id: { type: 'string', required: true },
};

module.exports = {
  Version: {
    id: { type: 'string', required: true },
    ...Date,
    ...Base,
  },
  CreationVersion: {
    ...Base,
    pageIds: { type: 'array', itemType: 'string', required: false },
  },
};
