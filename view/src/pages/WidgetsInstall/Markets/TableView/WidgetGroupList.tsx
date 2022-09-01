import useFetchIfUndefinedWhenMounted from '@/hooks/useFetchIfUndefinedWhenMounted';
import { WidgetGroupIncludeLibAndUserAndWidgetsAndLicense } from '@/typings/includes';
import { ProList } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Badge } from 'antd';
import { useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import Filter from './_components/Filter';

const renderBadge = (count?: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginTop: -3,
        marginLeft: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

export default () => {
  const { searchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    searchVal: model.searchVal,
  }));
  const { widgetGroups, requestDataSource } = useModel(
    'widgetsMarket.tableList.widgetGroups',
    (model) => ({
      widgetGroups: model.widgetGroups,
      requestDataSource: model.requestDataSource,
    }),
  );

  const result = useMemo(() => {
    return searchVal
      ? widgetGroups?.filter((item) => item.name.includes(searchVal))
      : widgetGroups;
  }, [widgetGroups, searchVal]);

  useFetchIfUndefinedWhenMounted({
    value: widgetGroups,
    fetch: requestDataSource,
  });

  return (
    <ProList<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense>
      rowKey="id"
      dataSource={result}
      grid={{ gutter: 16, column: 4 }}
      metas={{
        title: {
          title: '名称',
          dataIndex: 'name',
          render(dom, entity) {
            const item = entity as WidgetGroupIncludeLibAndUserAndWidgetsAndLicense;
            return (
              <span>
                <Highlighter
                  searchWords={[searchVal]}
                  autoEscape={true}
                  textToHighlight={entity.name}
                />
                <Badge
                  count={item.widgets.length}
                  style={{
                    marginTop: -3,
                    marginLeft: 4,
                    color: '#1890FF',
                    backgroundColor: '#E6F7FF',
                  }}
                />
              </span>
            );
          },
        },
        description: {
          title: '描述',
          dataIndex: 'desc',
          search: false,
        },
        subTitle: {
          title: '标签',
          dataIndex: 'labels',
        },
      }}
      toolBarRender={() => {
        return [<Filter key={'1'} />];
      }}
      pagination={{}}
    />
  );
};
