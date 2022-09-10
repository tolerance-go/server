import { Identity, Timestamp } from '../../constants/dto';
import { defineDTOGroup } from './core';

export default defineDTOGroup({
  WidgetLib: {
    name: { type: 'string', required: true },
    widgetLibId: { type: 'string', required: false },
    userId: { type: 'string', required: false },
    type: { type: 'string', required: true },
    desc: { type: 'string', required: false },
    labels: { type: 'array', itemType: 'string', required: false },
    ...Identity,
    ...Timestamp,
  },
});
