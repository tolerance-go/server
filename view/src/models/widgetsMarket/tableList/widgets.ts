import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { WidgetIncludeGroupIncludeLibAndUserAndLicense } from '@/typings/includes';
import useGetImmer from '@/utils/useGetImmer';
import { useMemoizedFn } from 'ahooks';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { OrderValues } from '@/pages/WidgetsInstall/models/marketListOrderMeta';

export default () => {
  const [widgets, setWidgets] =
    useGetImmer<WidgetIncludeGroupIncludeLibAndUserAndLicense[]>();

  const { run, loading } = useRequestReadyOnAuth(
    async (searchText: string, orderValues: OrderValues) => {
      return WidgetControllerFindAll({
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
          {
            model: 'License',
          },
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
        ],
      }) as Promise<WidgetIncludeGroupIncludeLibAndUserAndLicense[]>;
    },
    {
      onSuccess: (data) => {
        setWidgets(data);
      },
      manual: true,
      loadingDelay: widgets ? 300 : undefined,
    },
  );

  const addLicenseToItem = useMemoizedFn((id: string, license: API.License) => {
    setWidgets((draft) => {
      const target = draft?.find((item) => item.id === id);
      if (target) {
        target.licenses.push(license);
      }
    });
  });

  return {
    widgets,
    loading,
    requestDataSource: run,
    addLicenseToItem,
  };
};
