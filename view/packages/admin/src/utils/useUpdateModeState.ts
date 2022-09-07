import { useMemoizedFn } from 'ahooks';
import { Draft } from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { DraftFunction, Updater } from 'use-immer';
import useGetImmer from '../pages/design/utils/useGetImmer';

export type UpdateData<T> = {
  updateMode: 'init' | 'update';
  currentData: T;
};

export function useUpdateModeState<T>(
  initialState: (() => T) | T,
): [
  T,
  Updater<T>,
  () => T,
  Updater<T>,
  UpdateData<T>['updateMode'],
  () => UpdateData<T>['updateMode'],
] {
  const [stateMeta, setStateMeta, getStateMeta] = useGetImmer<UpdateData<T>>(
    () => {
      return {
        updateMode: 'init',
        currentData:
          /** T 为函数，则表示它为取值函数，T 本身不允许为 Function */
          typeof initialState === 'function'
            ? (initialState as () => T)()
            : initialState,
      };
    },
  );

  const updateCurrentData = (
    draft: WritableDraft<UpdateData<T>>,
    next: T | DraftFunction<T>,
  ) => {
    if (typeof next === 'function') {
      // 类型上是 void 但是允许返回值，并且 useImmer 是允许这样做的
      const results = (next as DraftFunction<T>)(
        draft.currentData,
      ) as Draft<T> | void;
      if (results !== undefined) {
        draft.currentData = results;
      }
    } else {
      /** 这里不知道为什么 WritableDraft<T> 变成了 Draft<T> 变成了 */
      draft.currentData = next as Draft<T>;
    }
  };

  const setStateData: Updater<T> = useMemoizedFn((next) => {
    setStateMeta((draft) => {
      updateCurrentData(draft, next);
      draft.updateMode = 'update';
    });
  });

  const initStateData: Updater<T> = useMemoizedFn((next) => {
    setStateMeta((draft) => {
      updateCurrentData(draft, next);
      draft.updateMode = 'init';
    });
  });

  const getStateData = useMemoizedFn(() => getStateMeta().currentData);

  const getUpdateMode = useMemoizedFn(() => stateMeta.updateMode);

  return [
    stateMeta.currentData,
    setStateData,
    getStateData,
    initStateData,
    stateMeta.updateMode,
    getUpdateMode,
  ];
}
