import { useGetState } from 'ahooks';

export default () => {
  /** 当前组件应用的状态 */
  const [activeNodeStatId, setActiveNodeStatId, getActiveNodeStatId] =
    useGetState<string>();

  return {
    activeNodeStatId,
    setActiveNodeStatId,
    getActiveNodeStatId,
  };
};
