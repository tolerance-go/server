import {
  LightFilter,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';

export default () => {
  return (
    <LightFilter key="1" onFinish={async (values) => console.log(values.sex)}>
      <ProFormSelect
        name="sex"
        label="排序按"
        showSearch
        allowClear={false}
        fieldProps={{
          labelInValue: true,
          placement: 'bottomRight',
          width: '120px',
        }}
        valueEnum={{
          rate: '评分',
          download: '下载数',
        }}
      />
      <ProFormRadio.Group
        name="radio"
        radioType="button"
        fieldProps={{
          size: 'small',
        }}
        options={[
          {
            value: 'weekly',
            label: '倒序',
          },
          {
            value: 'quarterly',
            label: '升序',
          },
        ]}
      />
    </LightFilter>
  );
};
