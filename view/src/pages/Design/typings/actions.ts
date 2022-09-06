import { ComponentAction } from '@/pages/design/models/nodesActions';

export interface SwitchStatusAction extends ComponentAction {
  settings: {
    targetComId: string;
    targetStatId: string;
  };
}
