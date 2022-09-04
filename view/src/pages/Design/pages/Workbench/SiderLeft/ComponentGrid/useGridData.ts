import { WidgetGroupControllerFindAll } from '@/services/server/WidgetGroupController';
import { WidgetLibControllerFindAll } from '@/services/server/WidgetLibController';
import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { useState } from 'react';
import { useModel } from '@umijs/max';
import useLoginUser from '@/hooks/useLoginUser';

export type DesignInstalledWidgetLib = API.WidgetLib & {
  widgetGroups: (API.WidgetGroup & {
    widgets: API.Widget[];
  })[];
};

export type DesignInstalledWidgetGroup = API.WidgetGroup & {
  widgets: API.Widget[];
};

export const useGridData = () => {
  const { mode: siderLeftMode } = useModel(
    'Design.workbench.siderLeftMode',
    (model) => ({
      mode: model?.siderLeftMode,
    }),
  );

  const user = useLoginUser();

  const [widgetsData, setWidgetsData] = useState<DesignInstalledWidgetLib[]>();

  useRequestReadyOnAuth(
    async () => {
      const [widgets, widgetGroups, widgetLibs] = await Promise.all([
        WidgetControllerFindAll({
          includes: [
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
        }),
        WidgetGroupControllerFindAll({
          includes: [
            {
              model: 'Widget',
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
        }) as Promise<DesignInstalledWidgetGroup[]>,
        WidgetLibControllerFindAll({
          includes: [
            {
              model: 'WidgetGroup',
              include: [
                {
                  model: 'Widget',
                },
              ],
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
        }) as Promise<DesignInstalledWidgetLib[]>,
      ]);

      return {
        widgets,
        widgetGroups,
        widgetLibs,
      };
    },
    {
      onSuccess({ widgets, widgetGroups, widgetLibs }) {
        // 其他库 用来存放没有库的 widget
        // 其他组 用来存放没有组的 widget
        const clonedWidgets = [...widgets];
        const clonedWidgetGroups = [...widgetGroups];

        setWidgetsData(
          widgetLibs
            .map((lib) => {
              return {
                ...lib,
                widgetGroups: lib.widgetGroups.map((group) => {
                  const index = clonedWidgets.findIndex(
                    (item) => item.id === group.id,
                  );
                  clonedWidgetGroups.splice(index, 1);

                  return {
                    ...group,
                    widgets: group.widgets.map((widget) => {
                      const index = clonedWidgets.findIndex(
                        (item) => item.id === widget.id,
                      );
                      clonedWidgets.splice(index, 1);
                      return widget;
                    }),
                  };
                }),
              };
            })
            .concat(
              clonedWidgetGroups.length || clonedWidgets.length
                ? {
                    id: 'other-lib',
                    name: '其他库',
                    type: 'other',
                    createdAt: '',
                    updatedAt: '',
                    widgetGroups: clonedWidgetGroups.concat(
                      clonedWidgets.length
                        ? [
                            {
                              name: '其他组',
                              type: 'other-group',
                              id: 'other-group',
                              createdAt: '',
                              updatedAt: '',
                              widgets: clonedWidgets,
                            },
                          ]
                        : [],
                    ),
                  }
                : [],
            ),
        );
      },
    },
  );

  return {
    widgetsData,
  };
};
