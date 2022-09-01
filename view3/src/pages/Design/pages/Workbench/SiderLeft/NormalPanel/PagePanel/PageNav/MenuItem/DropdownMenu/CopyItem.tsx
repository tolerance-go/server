import { useModel } from '@umijs/max';

export default ({ item }: { item: API.ShownPage }) => {
  const { setTempInputValueByTarget } = useModel(
    'Design.page.pageCreatingMeta',
    (model) => ({
      setTempInputValueByTarget: model.setTempInputValueByTarget,
    }),
  );

  return <div onClick={() => setTempInputValueByTarget(item)}>复制</div>;
};
