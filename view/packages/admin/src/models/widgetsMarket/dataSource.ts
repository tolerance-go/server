import { WidgetControllerFindAll } from '@fenxing/common/services/server/WidgetController';
import { WidgetGroupControllerFindAll } from '@fenxing/common/services/server/WidgetGroupController';
import { WidgetLibControllerFindAll } from '@fenxing/common/services/server/WidgetLibController';
import {
  WidgetGroupIncludeLibAndUserAndWidgetsAndLicense,
  WidgetIncludeGroupIncludeLibAndUserAndLicense,
  WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense,
} from '@/typings/includes';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { useState } from 'react';

export default () => {
  const [widgetMeta, setWidgetMeta] = useState<{
    widgets: WidgetIncludeGroupIncludeLibAndUserAndLicense[];
    widgetGroups: WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[];
    widgetLibs: WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[];
  }>();

  const { run, loading } = useRequestReadyOnAuth(
    async (name?: string) => {
      const [widgets, widgetGroups, widgetLibs] = await Promise.all([
        WidgetControllerFindAll({
          includes: [
            {
              model: 'WidgetGroup',
              include: [
                {
                  model: 'WidgetLib',
                },
              ],
            },
            {
              model: 'User',
              wheres: {
                where: [
                  {
                    fieldName: 'username',
                    conditions: {
                      like: name ? `%${name}%` : undefined,
                    },
                  },
                ],
              },
            },
          ],
        }) as Promise<WidgetIncludeGroupIncludeLibAndUserAndLicense[]>,
        WidgetGroupControllerFindAll({
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
        }) as Promise<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[]>,
        WidgetLibControllerFindAll({
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
        }) as Promise<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[]>,
      ]);
      return {
        widgets,
        widgetGroups,
        widgetLibs,
      };
    },
    {
      onSuccess: (data) => {
        setWidgetMeta(data);
      },
    },
  );

  return {
    widgetMeta,
    requestDataSource: run,
    loading,
  };
};
