import { app } from 'egg-mock/bootstrap';
import { Identity, Timestamp } from '../../constants/dto';
import { defineDTOEntitiesGroup } from './core';
import widget from './widget';

export default defineDTOEntitiesGroup(
  {
    User: app.model.User,
  },
  {
    User: {
      nickname: {
        type: 'string',
        required: false,
      },
      password: { type: 'string', required: true, enum: ['adf'] },
      username: { type: 'string', required: true },
      email: { type: 'string', required: false },
      avatar: { type: 'string', required: false },
      ...Identity,
      ...Timestamp,
      widgets: {
        type: 'array',
        itemType: 'Widget',
        required: false,
      },
    },
  },
  {
    include: [widget],
  },
);
