import { useModel } from '@/.umi/plugin-model';
import {
  OrderType,
  OrderValues,
} from '@/pages/WidgetsInstall/models/marketListOrderMeta';
import { usePickModel } from '@/utils/useModelTypes';
import {
  LightFilter,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import ReactDOM from 'react-dom';
import useSearchReq from '../../_hooks/useSearchReq';

export default () => {
  const { orderBy, orderValueEnum, orderType, setOrderBy, setOrderType } =
    usePickModel('WidgetsInstall.marketListOrderMeta', [
      'orderBy',
      'orderValueEnum',
      'setOrderBy',
      'orderType',
      'setOrderType',
    ]);

  const { searchByOrder } = useSearchReq();

  return (
    <LightFilter<OrderValues>
      onFinish={async (values) => {
        setOrderBy(values.orderBy);
        setOrderType(values.orderType);
        searchByOrder({
          orderBy: values.orderBy,
          orderType: values.orderType,
        });
      }}
      initialValues={{
        orderBy: orderBy,
        orderType,
      }}
    >
      <ProFormSelect
        name="orderBy"
        label="排序按"
        showSearch
        allowClear={false}
        fieldProps={{
          placement: 'bottomRight',
          width: '120px',
        }}
        valueEnum={orderValueEnum}
      />
      <ProFormRadio.Group
        name="orderType"
        radioType="button"
        fieldProps={{
          size: 'small',
        }}
        options={[
          {
            value: 'DESC',
            label: '倒序',
          },
          {
            value: 'ASC',
            label: '升序',
          },
        ]}
      />
    </LightFilter>
  );
};
