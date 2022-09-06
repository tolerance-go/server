import { AtomButton } from '@/pages/design/components/atomComs/AtomButton';
import { ElementCenter } from '@/pages/design/typings/ElementCenter';
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
