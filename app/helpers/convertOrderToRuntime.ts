export type OrderItem = {
  fieldName: string;
  orderType: 'ASC' | 'DESC';
};

export const convertOrderToRuntime = (orderData?: OrderItem[]) => {
  return orderData?.map((item) => [item.fieldName, item.orderType]);
};
