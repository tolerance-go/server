import { useGetImmer } from '@/pages/Design/utils/useGetImmer';
import { WidgetGroupControllerFindAll } from '@/services/server/WidgetGroupController';
import { WidgetGroupIncludeLibAndUserAndWidgetsAndLicense } from '@/typings/includes';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import { useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { OrderValues } from '@/pages/WidgetsInstall/models/marketListOrderMeta';

export default () => {
  const [widgetGroups, setWidgetGroups] =
    useGetImmer<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[]>();

  const { run, loading } = useRequestInternal(
    async (searchText: string, orderValues: OrderValues) => {
      return WidgetGroupControllerFindAll({
        order: orderValues
          ? [
              {
                orderType: orderValues.orderType,
                fieldName: orderValues.orderBy,
              },
            ]
          : undefined,
        wheres: {
          where: [
            {
              fieldName: 'name',
              conditions: {
                like: searchText ? `%${searchText}%` : undefined,
              },
            },
          ],
        },
        includes: [
          { model: 'WidgetLib' },
          { model: 'User' },
          { model: 'Widget' },
          { model: 'License' },
        ],
      }) as Promise<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[]>;
    },
    {
      onSuccess: (data) => {
        setWidgetGroups(data);
      },
    },
  );

  const addLicenseToItem = useMemoizedFn((id: string, license: API.License) => {
    setWidgetGroups((draft) => {
      const target = draft?.find((item) => item.id === id);
      if (target) {
        target.licenses.push(license);
      }
    });
  });

  return {
    widgetGroups,
    requestDataSource: run,
    loading,
    addLicenseToItem,
  };
};
