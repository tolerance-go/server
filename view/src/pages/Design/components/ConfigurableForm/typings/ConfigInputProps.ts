import { SettingFormConfig } from '@/pages/design/typings/SettingFormConfig';

export type ConfigInputProps = {
  disabled?: boolean;
  config: SettingFormConfig[number];
  value?: any;
  onChange?: (next: any) => void;
  bordered?: boolean;
  theme?: 'dark-area';
  formItemNamePrefix?: string;
};
