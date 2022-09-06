import { useModel } from '@umijs/max';
import WidgetGroupList from './WidgetGroupList';
import WidgetLibList from './WidgetLibList';
import WidgetList from './WidgetList';

export default () => {
  const { searchType } = useModel('widgetsMarket.searchType', (model) => ({
    searchType: model.searchType,
  }));

  if (searchType === 'widget') {
    return <WidgetList />;
  }
  if (searchType === 'widgetGroup') {
    return <WidgetGroupList />;
  }
  return <WidgetLibList />;
};
