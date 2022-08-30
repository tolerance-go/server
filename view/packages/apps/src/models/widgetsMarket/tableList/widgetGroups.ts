import { WidgetGroupControllerFindAll } from '@/services/server/WidgetGroupController';
import { WidgetGroupIncludeLibAndUserAndWidgetsAndLicense } from '@/typings/includes';
import { useRequest } from 'ahooks';
import { useState } from 'react';

export default () => {
  const [widgetGroups, setWidgetGroups] =
    useState<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[]>();

  const { run, loading } = useRequest(
    async (name?: string) => {
      return WidgetGroupControllerFindAll({
        includes: [
          {
            model: 'WidgetLib',
          },
          {
            model: 'User',
          },
          {
            model: 'Widget',
          },
        ],
      }) as Promise<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[]>;
    },
    {
      onSuccess: (data) => {
        setWidgetGroups(data);
      },
    },
  );

  return {
    widgetGroups,
    requestDataSource: run,
    loading,
  };
};
