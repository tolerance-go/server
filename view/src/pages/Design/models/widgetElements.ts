import { AtomButton } from '@/pages/Design/components/atomComs/AtomButton';
import { ElementCenter } from '@/pages/Design/typings/ElementCenter';
import { AtomLine } from '../components/atomComs/AtomLine';
import { AtomTable } from '../components/atomComs/AtomTable';

export default () => {
  const widgetElements: ElementCenter = {
    button: AtomButton,
    line: AtomLine,
    table: AtomTable,
  };

  return {
    widgetElements,
  };
};
