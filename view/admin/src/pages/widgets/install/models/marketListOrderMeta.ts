import { Server } from '@/typings/Server';
import { useMemoizedFn } from 'ahooks';
import { useState, useMemo } from 'react';

export type OrderType = Server.OrderType;

const defaultOrderValueEnum = {
  // rate: '评分',
  // download: '下载数',
  createdAt: '创建时间',
  updatedAt: '更新时间',
};

export type OrderValues = {
  orderBy: keyof typeof defaultOrderValueEnum;
  orderType: OrderType;
};

export default () => {
  const [orderValueEnum, setOrderValueEnum] = useState(defaultOrderValueEnum);
  const [orderBy, setOrderBy] =
    useState<keyof typeof orderValueEnum>('updatedAt');

  const [orderType, setOrderType] = useState<OrderType>('DESC');

  const orderMeta = useMemo(() => {
    return { orderBy, orderType };
  }, [orderBy, orderType]);

  const getOrderMeta = useMemoizedFn(() => orderMeta);

  return {
    getOrderMeta,
    orderMeta,
    orderBy,
    orderValueEnum,
    setOrderBy,
    orderType,
    setOrderType,
  };
};
