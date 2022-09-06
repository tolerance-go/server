import IconTrigger from '@/pages/design/components/IconTrigger';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';

export const PageCreator = () => {
  const { setTempInputValueByIndex } = useModel(
    'design.page.pageCreatingMeta',
    (model) => ({
      setTempInputValueByIndex: model.setTempInputValueByIndex,
    }),
  );

  return (
    <IconTrigger
      icon={<PlusOutlined />}
      onClick={() => {
        setTempInputValueByIndex();
      }}
    ></IconTrigger>
  );
};
