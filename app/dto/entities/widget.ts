import { app } from 'egg-mock/bootstrap';
import { Identity, Timestamp } from '../../constants/dto';
import { defineDTOEntitiesGroup } from './core';

export default defineDTOEntitiesGroup(
  {
    Widget: app.model.Widget,
  },
  {
    Widget: {
      name: { type: 'string', required: true },
      display: {
        type: 'string',
        required: true,
        enum: ['block', 'inline-block'],
      },
      elementType: { type: 'string', required: true },
      type: { type: 'string', required: true },
      desc: { type: 'string', required: false },
      detail: { type: 'string', required: true },
      labels: { type: 'array', itemType: 'string', required: true },
      widgetGroupId: { type: 'string', required: true },
      userId: { type: 'string', required: true },
      ...Identity,
      ...Timestamp,
    },
  },
);
