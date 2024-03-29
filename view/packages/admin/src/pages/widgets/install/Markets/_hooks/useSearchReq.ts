import { useMemoizedFn } from 'ahooks';
import { useModel } from '@umijs/max';
import { OrderValues } from '../../models/marketListOrderMeta';
import { usePickModel } from '@/utils/useModelTypes';

export default () => {
  const { searchType } = useModel('widgetsMarket.searchType', (model) => ({
    searchType: model.searchType,
  }));

  const { getSearchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    getSearchVal: model.getSearchVal,
  }));

  const { getOrderMeta } = usePickModel('widgets.install.marketListOrderMeta', [
    'getOrderMeta',
  ]);

  const { requestDataSource: requestDataSourceByWidgets } = usePickModel(
    'widgetsMarket.tableList.widgets',
    ['requestDataSource'],
  );

  const { requestDataSource: requestDataSourceByWidgetGroups } = usePickModel(
    'widgetsMarket.tableList.widgetGroups',
    ['requestDataSource'],
  );

  const { requestDataSource: requestDataSourceByWidgetLibs } = usePickModel(
    'widgetsMarket.tableList.widgetLibs',
    ['requestDataSource'],
  );

  const searchRequest = useMemoizedFn(
    (searchText: string, orderData: OrderValues) => {
      if (searchType === 'widget') {
        requestDataSourceByWidgets(searchText, orderData);
      } else if (searchType === 'widgetGroup') {
        requestDataSourceByWidgetGroups(searchText, orderData);
      } else {
        requestDataSourceByWidgetLibs(searchText, orderData);
      }
    },
  );

  const searchByText = useMemoizedFn((searchText: string) => {
    return searchRequest(searchText, getOrderMeta());
  });

  const searchByOrder = useMemoizedFn((orderData: OrderValues) => {
    return searchRequest(getSearchVal(), orderData);
  });

  const search = useMemoizedFn(() => {
    return searchRequest(getSearchVal(), getOrderMeta());
  });

  return {
    search,
    searchByText,
    searchByOrder,
  };
};
