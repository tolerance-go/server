import { ComponentAction } from '@/pages/Design/models/nodesActions';

export interface SwitchStatusAction extends ComponentAction {
  settings: {
    targetComId: string;
    targetStatId: string;
  };
}
