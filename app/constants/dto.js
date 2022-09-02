const Identity = {
  id: { type: 'string', required: true },
};

const UserId = {
  userId: { type: 'string', required: true },
};

const Timestamp = {
  createdAt: { type: 'string', required: true },
  updatedAt: { type: 'string', required: true },
};

const ResponseBase = {
  success: { type: 'boolean', required: true },
  errorCode: { type: 'integer', required: false },
  errorMessage: { type: 'string', required: false },
  showType: { type: 'integer', required: false },
};

module.exports = {
  UserId,
  Identity,
  Timestamp,
  ResponseBase,
};
