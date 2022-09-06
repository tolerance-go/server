import { pick } from 'lodash';

export const pickModel =
  <M, K extends keyof M>(keys: K[]) =>
  (model: M) => {
    /**
     * model 一定存在（组件中一定在 Executor 之后执行，全局的 model 处理了执行顺序，根据依赖关系）
     * 用 as 转一下
     */
    return pick(model, keys) as Pick<M, K>;
  };
