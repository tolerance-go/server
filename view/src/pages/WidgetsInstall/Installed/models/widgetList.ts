import { useGetImmer } from '@/utils/useGetImmer';
import { useImmer } from 'use-immer';
import { useMemoizedFn } from 'ahooks';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { useState } from 'react';

export type InstallWidget = API.Widget & {
  widgetGroup: API.WidgetGroup & {
    widgetLib: API.WidgetLib;
  };
  user: API.User;
  licenses: API.License[];
};

export default () => {
  const [widgets, setWidgets] = useGetImmer<InstallWidget[]>();

  const removeItemLic = useMemoizedFn((id: string, licId: string) => {
    setWidgets((draft) => {
      const target = draft?.find((item) => item.id === id);
      if (target) {
        const index = target.licenses.findIndex((item) => item.id === licId);
        target.licenses.splice(index, 1);
      }
    });
  });

  const { run: requestWidgets } = useRequestInternal(
    async (user: API.User) => {
      return WidgetControllerFindAll({
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
          },
          {
            model: 'License',
            wheres: {
              where: [
                {
                  fieldName: 'userId',
                  conditions: {
                    eq: user.id,
                  },
                },
              ],
            },
          },
        ],
      }) as Promise<InstallWidget[]>;
    },
    {
      onSuccess: (data) => {
        setWidgets(data);
      },
      manual: true,
    },
  );

  return {
    widgets,
    setWidgets,
    requestWidgets,
    removeItemLic,
  };
};
