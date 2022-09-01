import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { WidgetIncludeGroupIncludeLibAndUserAndLicense } from '@/typings/includes';
import useGetImmer from '@/utils/useGetImmer';
import { useMemoizedFn } from 'ahooks';
import { useRequestInternal } from '@/helpers/useRequestInternal';

export default () => {
  const [widgets, setWidgets] =
    useGetImmer<WidgetIncludeGroupIncludeLibAndUserAndLicense[]>();

  const { run, loading } = useRequestInternal(
    async (searchText?: string) => {
      return WidgetControllerFindAll({
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
    },
  );

  const addLicenseToItem = useMemoizedFn(
    (id: string, license: API.ShownLicense) => {
      setWidgets((draft) => {
        const target = draft?.find((item) => item.id === id);
        if (target) {
          target.licenses.push(license);
        }
      });
    },
  );

  return {
    widgets,
    loading,
    requestDataSource: run,
    addLicenseToItem,
  };
};
