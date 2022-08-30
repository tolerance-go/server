'use strict';

const Base = {
  name: { type: 'string', required: true },
  desc: { type: 'string', required: false },
  data: { type: 'string', required: false },
  app_id: { type: 'string', required: true },
  logic_created_at: { type: 'string', required: false },
  logic_updated_at: { type: 'string', required: false },
};

module.exports = {
  Database: {
    id: { type: 'string', required: true },
    ...Base,
  },
  ShownDatabase: {
    id: { type: 'string', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
    ...Base,
  },
  CreationDatabase: {
    ...Base,
  },
};
