import { SettingFormConfig } from '@/pages/design/typings/SettingFormConfig';
import { useState } from 'react';

/**
 * 组件对应配置表单的描述信息
 * 及其组件对应初始化配置信息
 */
export default () => {
  const [nodesSettingsFormConfigs, setNodesSettingsFormConfigs] = useState<
    Record<string, SettingFormConfig>
  >({
    button: [
      {
        type: 'string',
        name: 'text',
        label: '内容',
        required: true,
      },
      {
        type: 'select',
        name: 'type',
        label: '类型',
        multiple: false,
        options: [
          {
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'ghost',
            value: 'ghost',
          },
        ],
      },
    ],
    line: [
      {
        type: 'boolean',
        name: 'smooth',
        label: '平滑绘制',
      },
    ],
    table: [
      {
        type: 'list',
        name: 'columns',
        label: '列配置',
        columns: [
          {
            title: '标题',
            dataIndex: 'title',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          },
          {
            title: '数据映射',
            dataIndex: 'dataIndex',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          },
        ],
      },
    ],
  });

  return {
    nodesSettingsFormConfigs,
    setNodesSettingsFormConfigs,
  };
};
