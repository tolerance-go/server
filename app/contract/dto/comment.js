'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mapValues } = require('lodash');

const Base = {
  content: { type: 'string', required: false },
  replyTo: { type: 'string', required: false },
  likeNum: { type: 'integer', required: false },
  dislikeNum: { type: 'integer', required: false },
  discussId: { type: 'string', required: true },
};

module.exports = {
  Comment: {
    id: { type: 'string', required: true },
    ...Base,
  },
  ShownComment: {
    id: { type: 'string', required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
    ...Base,
  },
  CreationComment: {
    ...Base,
  },
  UpdationComment: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
