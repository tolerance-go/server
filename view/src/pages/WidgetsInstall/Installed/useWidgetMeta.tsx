import { ProButton } from '@/components/ProButton';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import useLoginUser from '@/hooks/useLoginUser';
import { LicenseControllerDestroy } from '@/services/server/LicenseController';
import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import useGetImmer from '@/utils/useGetImmer';
import { ProListProps } from '@ant-design/pro-components';
import { useMemoizedFn, useMount } from 'ahooks';
import { Col, Row } from 'antd';
import { useMemo } from 'react';
import Highlighter from 'react-highlight-words';

export type InstallWidget = API.Widget & {
  widgetGroup: API.WidgetGroup & {
    widgetLib: API.WidgetLib;
  };
  user: API.User;
  licenses: API.License[];
};

export default ({ searchText }: { searchText: string }) => {
  const [widgets, setWidgets] = useGetImmer<InstallWidget[]>();

  const removeItemLic = useMemoizedFn((id: string, licId: string) => {
    setWidgets((draft) => {
      const target = draft?.find((item) => item.id === id);
      if (target) {
        const index = target.licenses.findIndex((item) => item.id === licId);
        target.licenses.splice(index, 1);
      }
    });
  });

  const user = useLoginUser();

  const { run } = useRequestReadyOnAuth(
    async () => {
      return WidgetControllerFindAll({
        includes: [
          {
            model: 'WidgetGroup',
            include: [
              {
                model: 'WidgetLib',
              },
            ],
          },
          {
            model: 'User',
          },
          {
            model: 'License',
            wheres: {
              where: [
                {
                  fieldName: 'userId',
                  conditions: {
                    eq: user.id,
                  },
                },
              ],
            },
          },
        ],
      }) as Promise<InstallWidget[]>;
    },
    {
      onSuccess: (data) => {
        setWidgets(data);
      },
    },
  );

  const metas: ProListProps<InstallWidget>['metas'] = {
    title: {
      title: '名称',
      dataIndex: 'name',
      render(dom, entity) {
        return (
          <Highlighter
            searchWords={[searchText]}
            autoEscape={true}
            textToHighlight={entity.name}
          />
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
    content: {
      search: false,
      render: (__, item) => {
        return (
          <Row>
            <Col span={8}>
              <div style={{ color: '#00000073' }}>类型</div>
              <div style={{ color: '#000000D9' }}>
                <Highlighter
                  searchWords={[searchText]}
                  autoEscape={true}
                  textToHighlight={item.elementType}
                />
              </div>
            </Col>
            <Col span={8}>
              <div style={{ color: '#00000073' }}>分组</div>
              <div style={{ color: '#000000D9' }}>
                {item.widgetGroup?.name && (
                  <Highlighter
                    searchWords={[searchText]}
                    autoEscape={true}
                    textToHighlight={item.widgetGroup?.name}
                  />
                )}
              </div>
            </Col>
            <Col span={8}>
              <div style={{ color: '#00000073' }}>组件库</div>
              <div style={{ color: '#000000D9' }}>
                {item.widgetGroup?.widgetLib.name && (
                  <Highlighter
                    searchWords={[searchText]}
                    autoEscape={true}
                    textToHighlight={item.widgetGroup?.widgetLib.name}
                  />
                )}
              </div>
            </Col>
          </Row>
        );
      },
    },
    actions: {
      render(dom, entity, index, action, schema) {
        const lic = entity.licenses.find((lic) => lic.userId === user.id);
        return (
          <ProButton
            style={{
              width: 80,
            }}
            type="link"
            size="small"
            disabled={!lic}
            request={async () => {
              return LicenseControllerDestroy({
                id: lic!.id,
              });
            }}
            onReqSuccess={(lic) => {
              removeItemLic(entity.id, lic.id);
            }}
          >
            {lic ? '卸载' : '已卸载'}
          </ProButton>
        );
      },
    },
  };

  const dataSource = useMemo(() => {
    return searchText
      ? widgets?.filter(
          (item) =>
            item.name.includes(searchText) ||
            item.widgetGroup?.name.includes(searchText) ||
            item.widgetGroup?.widgetLib?.name.includes(searchText),
        )
      : widgets;
  }, [searchText, widgets]);

  return {
    listProps: {
      metas,
      dataSource,
      split: true,
    },
    run,
  };
};
