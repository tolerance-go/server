import { useLocation } from '@/.umi/exports';
import { PATHS } from '@/constants/path';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import useInitPageData from '@/hooks/useInitPageData';
import useQueryPageId from '@/hooks/useQueryPageId';
import { PageControllerShow } from '@fenxing/common/services/server/PageController';

export default () => {
  const pageId = useQueryPageId();

  const location = useLocation();

  const initPageData = useInitPageData();

  useRequestReadyOnAuth(
    async () => {
      return await PageControllerShow({ id: pageId! });
    },
    {
      ready: location.pathname === PATHS.PLAYGROUND && !!pageId,
      onSuccess(data) {
        initPageData(data);
      },
    },
  );
};
