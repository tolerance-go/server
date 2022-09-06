import { ProFormColumnsType } from '@ant-design/pro-components';
import { NamePath } from 'antd/lib/form/interface';
import { RecordType } from './index';
import { BoxPosition } from '../models/page/nodesStyles';
import { BoxSizeInputValue } from '../components/ConfigurableForm/inputs/BoxSizeInput';
import { NodesStatus, NodeStatus } from '../models/page/nodesStatus';

export type SelectOptionsFn = (options: {
  getComponentsStatus: () => NodesStatus;
  getSelectedComStatus: () => NodeStatus | undefined;
}) => { label?: string; value: string }[];

export type WithDependencies<T extends (...args: any[]) => any> = [
  (depends: RecordType, ...args: Parameters<T>) => ReturnType<T>,
  {
    dependencies: NamePath[];
  },
];

export type GetSelectedNodeId = () => string;

export type InitialValueParams = {
  getSelectedNodeId: GetSelectedNodeId;
};

export type InitialValueFn<T> = (params: InitialValueParams) => T;

export type SettingFormConfig = ((
  | {
      type: 'string';
      initialValue?: string | InitialValueFn<string>;
    }
  | {
      type: 'boolean';
      initialValue?: boolean | InitialValueFn<boolean>;
    }
  | {
      type: 'boxSize';
      initialValue?: BoxSizeInputValue | InitialValueFn<BoxSizeInputValue>;
    }
  | {
      type: 'boxPosition';
      initialValue?: BoxPosition | InitialValueFn<BoxPosition>;
    }
  | {
      type: 'list';
      columns: ProFormColumnsType[];
      initialValue?: any[] | InitialValueFn<any[]>;
    }
  | {
      type: 'select';
      multiple?: boolean;
      options:
        | { label?: string; value: string }[]
        | SelectOptionsFn
        | WithDependencies<SelectOptionsFn>;
      initialValue?: any | InitialValueFn<any>;
    }
) & {
  visible?: [
    (values: Record<string, any>) => boolean,
    {
      dependencies: NamePath[];
    },
  ];
  name: string;
  label: string;
  required?: boolean;
  /** formItem 垂直布局 */
  verticalLayout?: boolean;
  /** label 是否左对齐 */
  labelAlignLeft?: boolean;
  /** 是否显示分割线 */
  formItemSplit?: boolean;
})[];
