import { ComponentAction } from '@/pages/Design/models/comsActions';

export interface SwitchStatusAction extends ComponentAction {
  settings: {
    targetComId: string;
    targetStatId: string;
  };
}
