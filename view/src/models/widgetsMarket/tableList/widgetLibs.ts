import { useGetImmer } from '@/pages/Design/utils/useGetImmer';
import { WidgetLibControllerFindAll } from '@/services/server/WidgetLibController';
import { WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense } from '@/typings/includes';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import { useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { OrderValues } from '@/pages/WidgetsInstall/models/marketListOrderMeta';

export default () => {
  const [widgetLibs, setWidgetLibs] =
    useGetImmer<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[]>();

  const { run, loading } = useRequestInternal(
    async (searchText: string, orderValues: OrderValues) => {
      return WidgetLibControllerFindAll({
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
          { model: 'User' },
          {
            model: 'WidgetGroup',
            include: [
              {
                model: 'Widget',
              },
            ],
          },
          { model: 'License' },
        ],
      }) as Promise<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[]>;
    },
    {
      onSuccess: (data) => {
        setWidgetLibs(data);
      },
    },
  );

  const addLicenseToItem = useMemoizedFn((id: string, license: API.License) => {
    setWidgetLibs((draft) => {
      const target = draft?.find((item) => item.id === id);
      if (target) {
        target.licenses.push(license);
      }
    });
  });

  return {
    widgetLibs,
    requestDataSource: run,
    addLicenseToItem,
    loading,
  };
};
