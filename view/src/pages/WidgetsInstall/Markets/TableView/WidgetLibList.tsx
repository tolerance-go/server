import { ProButton } from '@/components/ProButton';
import useLoginUser from '@/hooks/useLoginUser';
import { LicenseControllerCreate } from '@/services/server/LicenseController';
import { WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense } from '@/typings/includes';
import { ProList } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMount } from 'ahooks';
import { Badge } from 'antd';
import { useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import Filter from './_components/Filter';

export default () => {
  const { searchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    searchVal: model.searchVal,
  }));
  const { widgetLibs, requestDataSource, addLicenseToItem } = useModel(
    'widgetsMarket.tableList.widgetLibs',
    (model) => ({
      widgetLibs: model.widgetLibs,
      requestDataSource: model.requestDataSource,
      addLicenseToItem: model.addLicenseToItem,
    }),
  );
  const user = useLoginUser();

  const result = useMemo(() => {
    return searchVal
      ? widgetLibs?.filter((item) => item.name.includes(searchVal))
      : widgetLibs;
  }, [widgetLibs, searchVal]);

  useMount(() => {
    requestDataSource();
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
            const total = (
              it: WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense,
            ) => {
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
        actions: {
          render(dom, entity, index, action, schema) {
            const license = entity.licenses.find(
              (lic) => lic.userId === user.id && lic.widgetLibId === entity.id,
            );

            return (
              <ProButton
                style={{
                  width: 80,
                }}
                disabled={!!license}
                size="small"
                type="link"
                key={'get'}
                request={async () => {
                  const license = await LicenseControllerCreate({
                    widgetLibId: entity.id,
                  });
                  return license;
                }}
                onReqSuccess={(data) => {
                  addLicenseToItem(entity.id, data);
                }}
              >
                {!!license ? '已安装' : '免费安装'}
              </ProButton>
            );
          },
        },
      }}
      toolBarRender={() => {
        return [<Filter key={'1'} />];
      }}
      pagination={{}}
    />
  );
};
