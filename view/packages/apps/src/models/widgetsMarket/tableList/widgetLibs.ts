import { WidgetLibControllerFindAll } from '@/services/server/WidgetLibController';
import { WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense } from '@/typings/includes';
import { useRequest } from 'ahooks';
import { useState } from 'react';

export default () => {
  const [widgetLibs, setWidgetLibs] =
    useState<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[]>();

  const { run, loading } = useRequest(
    async (name?: string) => {
      return WidgetLibControllerFindAll({
        includes: [
          {
            model: 'User',
          },
          {
            model: 'WidgetGroup',
            include: [
              {
                model: 'Widget',
              },
            ],
          },
        ],
      }) as Promise<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[]>;
    },
    {
      onSuccess: (data) => {
        setWidgetLibs(data);
      },
    },
  );

  return {
    widgetLibs,
    requestDataSource: run,
    loading,
  };
};
