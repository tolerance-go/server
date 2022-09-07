import { PagesSiderMode } from '@/pages/design/models/workbench/normalModeSubMode';
import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';
import { Segmented } from 'antd';

export default () => {
  const { pagesSiderMode, setPagesSiderMode } = useModel(
    'design.workbench.normalModeSubMode',
    pickModel(['pagesSiderMode', 'setPagesSiderMode']),
  );

  return (
    <Segmented
      onChange={(val) => setPagesSiderMode(val as PagesSiderMode)}
      value={pagesSiderMode}
      block
      options={[
        {
          label: '页面',
          value: 'page',
        },
        {
          label: '布局',
          value: 'layout',
        },
        {
          label: '模版',
          value: 'material',
        },
      ]}
    />
  );
};
