import { AtomButtonSettings } from '@/pages/Design/components/atomComs/AtomButton';
import { AtomTableSettings } from '@/pages/Design/components/atomComs/AtomTable';
import { LineConfig } from '@ant-design/plots';
import { useGetState } from 'ahooks';

export default () => {
  const [comsInitialSettings, setComsInitialSettings, getComsInitialSettings] =
    useGetState<
      {
        button: AtomButtonSettings;
        line: Partial<LineConfig>;
        table: AtomTableSettings;
      } & Record<string, Record<string, any>>
    >({
      button: {
        text: '按钮',
        type: 'primary',
      },
      line: {
        smooth: false,
      },
      table: {},
    });

  return {
    comsInitialSettings,
    getComsInitialSettings,
    setComsInitialSettings,
  };
};
