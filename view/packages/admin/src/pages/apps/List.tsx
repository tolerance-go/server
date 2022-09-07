import { useNavigate } from '@/.umi/exports';
import { ProButton } from '@/components/ProButton';
import { PATHS } from '@/constants/path';
import useLoginUser from '@/hooks/useLoginUser';
import {
  AppControllerDestroy,
  AppControllerIndexIncludeUser,
  AppControllerShareToUser,
} from '@fenxing/common/services/server/AppController';
import { UserControllerIndex } from '@fenxing/common/services/server/UserController';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormSelect,
  ProList,
} from '@ant-design/pro-components';
import { Avatar, Button, message, Space, Tag, Tooltip, Typography } from 'antd';
import { useRef } from 'react';
import CreateForm from './CreateForm';
import qs from 'qs';

export default () => {
  const listRef = useRef<ActionType>(null);

  const navigate = useNavigate();

  const user = useLoginUser();

  return (
    <ProList<API.ShownAppIncludeUser>
      actionRef={listRef}
      toolBarRender={() => {
        return [<CreateForm listRef={listRef} key="create" />];
      }}
      request={async (params) => {
        try {
          const data = await AppControllerIndexIncludeUser({
            title: params.title,
            labels: params.labels,
          });
          return {
            success: true,
            data,
          };
        } catch {
          return {
            success: false,
          };
        }
      }}
      search={{}}
      pagination={{
        defaultPageSize: 8,
        showSizeChanger: false,
      }}
      rowSelection={{}}
      grid={{ gutter: 16, column: 3 }}
      onItem={(record: any) => {
        return {
          onMouseEnter: () => {
            console.log(record);
          },
          onClick: () => {
            console.log(record);
          },
        };
      }}
      metas={{
        title: {
          dataIndex: 'title',
          title: '标题',
        },
        subTitle: {
          title: '标签',
          dataIndex: 'labels',
          render: (_, row) => {
            return (
              <Space size={0}>
                {row.labels?.map((label) => (
                  <Tag color="blue" key={label}>
                    {label}
                  </Tag>
                ))}
              </Space>
            );
          },
        },
        type: {
          search: false,
        },
        // avatar: {
        //   search: false,
        // },
        content: {
          search: false,
          render(__, record) {
            return (
              <div>
                <Typography.Paragraph type="secondary">
                  {record.desc}
                </Typography.Paragraph>
                <Space key={'share'} align="center" size={2}>
                  <Avatar.Group
                    size={'small'}
                    maxCount={5}
                    style={{
                      position: 'relative',
                      top: 3,
                    }}
                  >
                    {record.users.map((user) => {
                      return (
                        <Tooltip key={user.id} title={user.username}>
                          <Avatar
                            style={{
                              verticalAlign: 'middle',
                            }}
                          >
                            {user.username.slice(0, 1)}
                          </Avatar>
                        </Tooltip>
                      );
                    })}
                  </Avatar.Group>
                  <ModalForm
                    title="添加协作者"
                    trigger={
                      <Button size="small" shape="circle" type="dashed">
                        <PlusOutlined />
                      </Button>
                    }
                    onFinish={async (values) => {
                      try {
                        await AppControllerShareToUser({
                          userIds: values.userIds,
                          appId: record.id,
                        });
                        listRef.current?.reload();
                        return true;
                      } catch {
                        return false;
                      }
                    }}
                  >
                    <ProFormSelect
                      name={'userIds'}
                      label="选择用户"
                      mode="multiple"
                      request={async () => {
                        const list = await UserControllerIndex({});
                        return list
                          .map((item) => ({
                            label: item.username,
                            value: item.id,
                          }))
                          .filter(
                            (item) =>
                              user.id !== item.value &&
                              !record.users.find(
                                (user) => user.id === item.value,
                              ),
                          );
                      }}
                    ></ProFormSelect>
                  </ModalForm>
                </Space>
              </div>
            );
          },
        },
        actions: {
          cardActionProps: 'extra',
          render: (item, record) => [
            <Button
              key={'design'}
              style={{
                padding: 0,
              }}
              type="link"
              onClick={() => {
                window.open(
                  `${PATHS.DESIGN}?${qs.stringify({
                    appId: record.id,
                  })}`,
                );
              }}
            >
              设计
            </Button>,
            user.id !== record.userId ? null : (
              <ProButton
                style={{
                  padding: 0,
                }}
                key={'remove'}
                type="link"
                danger
                popconfirm={{
                  title: '确认删除吗？',
                }}
                request={async () => {
                  return AppControllerDestroy({
                    id: record.id,
                  });
                }}
                onReqSuccess={() => {
                  message.success('删除应用成功');
                  listRef.current?.reload();
                }}
              >
                删除
              </ProButton>
            ),
          ],
        },
      }}
      headerTitle="应用列表"
      // dataSource={data}
    />
  );
};
