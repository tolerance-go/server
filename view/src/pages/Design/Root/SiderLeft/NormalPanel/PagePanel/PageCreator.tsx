import IconTrigger from '@/pages/Design/components/IconTrigger';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';

export const PageCreator = () => {
  const { setTempInputValueByIndex } = useModel(
    'Design.page.pageCreatingMeta',
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
