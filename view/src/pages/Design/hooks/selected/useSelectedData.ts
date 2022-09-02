import { useModel } from '@umijs/max';
import { useMemo } from 'react';

export const useSelectedData = () => {
  const { dataList } = useModel('Design.database.dataList', (model) => {
    return {
      dataList: model.dataList,
    };
  });

  const { selectedDataId } = useModel('Design.database.selectedDataId', (model) => ({
    selectedDataId: model.selectedDataId,
  }));

  const selectedData = useMemo(() => {
    if (selectedDataId) {
      return dataList.find((item) => item.id === selectedDataId);
    }
    return undefined;
  }, [dataList, selectedDataId]);
  
  return {
    selectedData,
    selectedDataId,
  };
};