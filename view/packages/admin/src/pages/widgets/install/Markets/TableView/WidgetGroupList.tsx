import { ProButton } from '@/components/ProButton';
import useFetchIfUndefinedWhenMounted from '@/hooks/useFetchIfUndefinedWhenMounted';
import useLoginUser from '@/hooks/useLoginUser';
import { LicenseControllerCreate } from '@fenxing/common/services/server/LicenseController';
import { WidgetGroupIncludeLibAndUserAndWidgetsAndLicense } from '@/typings/includes';
import { ProList } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMount } from 'ahooks';
import { Badge } from 'antd';
import { useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import useSearchReq from '../_hooks/useSearchReq';
import Filter from './_components/Filter';

export default () => {
  const { searchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    searchVal: model.searchVal,
  }));
  const { widgetGroups, requestDataSource, addLicenseToItem } = useModel(
    'widgetsMarket.tableList.widgetGroups',
    (model) => ({
      widgetGroups: model.widgetGroups,
      requestDataSource: model.requestDataSource,
      addLicenseToItem: model.addLicenseToItem,
    }),
  );

  const user = useLoginUser();

  const result = useMemo(() => {
    return searchVal
      ? widgetGroups?.filter((item) => item.name.includes(searchVal))
      : widgetGroups;
  }, [widgetGroups, searchVal]);

  const { search } = useSearchReq();

  useMount(() => {
    search();
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
            const item =
              entity as WidgetGroupIncludeLibAndUserAndWidgetsAndLicense;
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
        actions: {
          render(dom, entity, index, action, schema) {
            const license = entity.licenses.find(
              (lic) =>
                lic.userId === user.id && lic.widgetGroupId === entity.id,
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
                    widgetGroupId: entity.id,
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
