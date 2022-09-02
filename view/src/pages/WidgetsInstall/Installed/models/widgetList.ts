import { useRequestInternal } from '@/helpers/useRequestInternal';
import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { useState } from 'react';

export type InstallWidget = API.Widget & {
  widgetGroup: API.WidgetGroup & {
    widgetLib: API.WidgetLib;
  };
  user: API.User;
};

export default () => {
  const [widgets, setWidgets] = useState<InstallWidget[]>();

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
  };
};
