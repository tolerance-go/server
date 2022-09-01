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
    <PlusOutlined
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        setTempInputValueByIndex();
      }}
    />
  );
};
