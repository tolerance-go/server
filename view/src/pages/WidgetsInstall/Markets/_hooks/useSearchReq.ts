import { useMemoizedFn } from 'ahooks';
import { useModel } from '@umijs/max';
import { OrderValues } from '../../models/marketListOrderMeta';
import { useModelPick } from '@/utils/useModelPick';

export default () => {
  const { searchType } = useModel('widgetsMarket.searchType', (model) => ({
    searchType: model.searchType,
  }));

  const { getSearchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    getSearchVal: model.getSearchVal,
  }));

  const { getOrderMeta } = useModelPick('WidgetsInstall.marketListOrderMeta', [
    'getOrderMeta',
  ]);

  const { requestDataSource: requestDataSourceByWidgets } = useModelPick(
    'widgetsMarket.tableList.widgets',
    ['requestDataSource'],
  );

  const { requestDataSource: requestDataSourceByWidgetGroups } = useModelPick(
    'widgetsMarket.tableList.widgetGroups',
    ['requestDataSource'],
  );

  const { requestDataSource: requestDataSourceByWidgetLibs } = useModelPick(
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
