import { OrderType } from '../typings/OrderType';

export type OrderItem = {
  fieldName: string;
  orderType: OrderType;
};

export const convertOrderToRuntime = (orderData?: OrderItem[]) => {
  return orderData?.map((item) => [item.fieldName, item.orderType]);
};
