const Identity = {
  id: { type: 'string', required: true },
};

const Timestamp = {
  createdAt: { type: 'string', required: true },
  updatedAt: { type: 'string', required: true },
};

const User = {
  userId: { type: 'string', required: true },
};

module.exports = {
  User,
  Identity,
  Timestamp,
};
