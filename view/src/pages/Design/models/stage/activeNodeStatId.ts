import { useGetState } from 'ahooks';

export default () => {
  /** 当前组件应用的状态 */
  const [activeNodeStatId, setActiveComStatId, getActiveComStatId] =
    useGetState<string>();

  return {
    activeNodeStatId,
    setActiveComStatId,
    getActiveComStatId,
  };
};
