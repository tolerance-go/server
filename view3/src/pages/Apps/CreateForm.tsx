import TagsInput from '@/components/TagsInput';
import { AppControllerCreate } from '@/services/server/AppController';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';

export default ({ listRef }: { listRef: React.RefObject<ActionType> }) => {
  return (
    <ModalForm<API.CreationApp>
      title="新建表单"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新增应用
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          await AppControllerCreate(values);

          message.success('创建成功');
          listRef.current?.reload();

          return true;
        } catch {
          return false;
        }
      }}
    >
      <ProFormText
        name="title"
        label="标题"
        tooltip="最长为 30 位"
        placeholder="请输入名称"
        rules={[
          {
            required: true,
          },
          {
            max: 30,
          },
        ]}
      />
      <Form.Item name="labels" label="标签">
        <TagsInput />
      </Form.Item>
      <ProFormTextArea name="desc" label="描述" placeholder="请输入描述" />
    </ModalForm>
  );
};
