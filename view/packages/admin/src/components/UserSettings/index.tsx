// 运行时配置

import { UserControllerUpdate } from '@fenxing/common/services/server/UserController';
import { SettingOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form } from 'antd';
import { AvatarInput } from '../inputs/AvatarInput';

export const UserSettings = () => {
  const { initialState, refresh } = useModel('@@initialState');

  if (!initialState) return null;

  return (
    <ModalForm
      title="用户信息设置"
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={initialState.user}
      key="settings"
      trigger={<SettingOutlined />}
      onFinish={async (values) => {
        await UserControllerUpdate(
          {
            id: initialState.user!.id,
          },
          values,
        );

        refresh();

        return true;
      }}
    >
      <Form.Item label="头像" name={'avatar'}>
        <AvatarInput action="/api/upload" />
      </Form.Item>
      <ProFormText name={'nickname'} label="昵称"></ProFormText>
      <ProFormText name={'email'} label="邮箱"></ProFormText>
    </ModalForm>
  );
};
