/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mapValues } = require('lodash');
const { Identity, Timestamp } = require('../../constants/dto');

const Base = {
  nickname: { type: 'string', required: false },
  password: { type: 'string', required: true },
  username: { type: 'string', required: true },
  email: { type: 'string', required: false },
  avatar: { type: 'string', required: false },
};

module.exports = {
  LoginAuth: {
    password: { type: 'string', required: true },
    username: { type: 'string', required: true },
  },
  User: {
    ...Identity,
    ...Base,
  },
  ShownUser: {
    ...Timestamp,
    ...Identity,
    ...Base,
  },
  CreationUser: {
    ...Base,
  },
  UpdationUser: {
    ...mapValues(Base, (item) => ({ ...item, required: false })),
  },
};
