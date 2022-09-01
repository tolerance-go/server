import useFetchIfUndefinedWhenMounted from '@/hooks/useFetchIfUndefinedWhenMounted';
import { WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense } from '@/typings/includes';
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
  const { widgetLibs, requestDataSource } = useModel(
    'widgetsMarket.tableList.widgetLibs',
    (model) => ({
      widgetLibs: model.widgetLibs,
      requestDataSource: model.requestDataSource,
    }),
  );

  const result = useMemo(() => {
    return searchVal
      ? widgetLibs?.filter((item) => item.name.includes(searchVal))
      : widgetLibs;
  }, [widgetLibs, searchVal]);

  useFetchIfUndefinedWhenMounted({
    value: widgetLibs,
    fetch: requestDataSource,
  });

  return (
    <ProList<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense>
      rowKey="id"
      dataSource={result}
      grid={{ gutter: 16, column: 3 }}
      metas={{
        title: {
          title: '名称',
          dataIndex: 'name',
          render(dom, item) {
            const total = (it: WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense) => {
              let count = 0;
              for (let iit of it.widgetGroups) {
                count += iit.widgets.length;
              }
              return count;
            };
            return (
              <span>
                <Highlighter
                  searchWords={[searchVal]}
                  autoEscape={true}
                  textToHighlight={item.name}
                />
                <Badge
                  count={total(item)}
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
