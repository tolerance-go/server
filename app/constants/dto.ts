import { defineDTO } from '../dto/entities/core';

export const Identity = defineDTO({
  id: { type: 'string', required: true },
});

export const UserId = defineDTO({
  userId: { type: 'string', required: true },
});

export const Timestamp = defineDTO({
  createdAt: { type: 'string', required: true },
  updatedAt: { type: 'string', required: true },
});

export const ResponseBase = defineDTO({
  success: { type: 'boolean', required: true },
  errorCode: { type: 'integer', required: false },
  errorMessage: { type: 'string', required: false },
  showType: { type: 'boolean', required: false },
});
