import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { getPageIdOrThrow } from '@/pages/design/helps/getPageIdOrThrow';
import { DiscussControllerCountComments } from '@fenxing/common/services/server/DiscussController';
import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';

const useAllDiscussCommentsCount = () => {
  const [allDiscussCommentsCount, setAllDiscussCommentsCount] = useState<
    Record<string, number>
  >({});

  useRequestReadyOnAuth(
    async () => {
      const pageId = getPageIdOrThrow();

      return DiscussControllerCountComments({
        pageId,
      });
    },
    {
      onSuccess: (data) => {
        if (data) {
          setAllDiscussCommentsCount(
            data.reduce((acc, next) => ({ ...acc, [next.id]: next.count }), {}),
          );
        }
      },
    },
  );

  /** 增加 */
  const increaseDiscussCommentsCount = useMemoizedFn((id: number) => {
    setAllDiscussCommentsCount((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  });

  /** 减少 */
  const reduceDiscussCommentsCount = useMemoizedFn(
    (id: number, num: number = 1) => {
      setAllDiscussCommentsCount((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 0) - num,
      }));
    },
  );

  return {
    allDiscussCommentsCount,
    increaseDiscussCommentsCount,
    reduceDiscussCommentsCount,
  };
};

export default useAllDiscussCommentsCount;
