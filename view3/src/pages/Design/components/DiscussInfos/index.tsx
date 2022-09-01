import { useModel } from '@umijs/max';
import { DiscussContent } from './DiscussDetail';
import DiscussList from './DiscussList';

export const DiscussInfos = () => {
  const { detailMode } = useModel('Design.playground', (model) => ({
    detailMode: model.detailMode,
  }));

  return detailMode === 'detail' ? <DiscussContent /> : <DiscussList />;
};
