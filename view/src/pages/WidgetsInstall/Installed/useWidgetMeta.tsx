import { useModel } from '@/.umi/plugin-model';
import { ProButton } from '@/components/ProButton';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import useLoginUser from '@/hooks/useLoginUser';
import { LicenseControllerDestroy } from '@/services/server/LicenseController';
import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { ProListProps } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { Button, Col, message, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { InstallWidget } from './models/widgetList';

export default ({ searchText }: { searchText: string }): ProListProps => {
  const { widgets, setWidgets, requestWidgets, removeItemLic } = useModel(
    'WidgetsInstall.Installed.widgetList',
    (model) => ({
      widgets: model.widgets,
      setWidgets: model.setWidgets,
      requestWidgets: model.requestWidgets,
      removeItemLic: model.removeItemLic,
    }),
  );

  const user = useLoginUser();

  useMount(() => {
    requestWidgets(user);
  });

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
    metas,
    dataSource,
    split: true,
  };
};
