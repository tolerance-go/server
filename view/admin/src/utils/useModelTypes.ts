import type { models as rawModels } from '@@/plugin-model/model';
import { pick } from 'lodash';
import { useModel } from '@/.umi/plugin-model';

type Models = typeof rawModels;
type GetNamespaces<M> = {
  [K in keyof M]: M[K] extends { namespace: string }
    ? M[K]['namespace']
    : never;
}[keyof M];

type Namespaces = GetNamespaces<Models>;
type GetModelByNamespace<M, N> = {
  [K in keyof M]: M[K] extends { namespace: string; model: unknown }
    ? M[K]['namespace'] extends N
      ? M[K]['model'] extends (...args: any) => any
        ? ReturnType<M[K]['model']>
        : never
      : never
    : never;
}[keyof M];

type Model<N> = GetModelByNamespace<Models, N>;

/**
 * 在 model 之间的依赖， model 有可能为空
 * 因为 Executor 执行的顺序是不固定的
 * 组件中则不会，react 保证了子组件一定在父组件之后初始化
 */
// 这个函数保证在组件中 useModel 的类型正确性
export const usePickModel = <N extends Namespaces, K extends keyof Model<N>>(
  namespace: N,
  keys: K[],
): Pick<Model<N>, K> => {
  const model = useModel(namespace, (model) => {
    return pick(model as NonNullable<typeof model>, keys);
  });
  return model;
};

/** 这个函数保证在 model 中 useModel 的类型正确性 */
export const usePickModelSafeInModel = <
  N extends Namespaces,
  K extends keyof Model<N>,
>(
  namespace: N,
  keys: K[],
): Partial<Pick<Model<N>, K>> => {
  const model = useModel(namespace, (model) => {
    return pick(model, keys);
  });
  return model;
};

type Selector<N, S> = (model?: Model<N>) => S;

type SelectedModel<N, T> = T extends (...args: any) => any
  ? ReturnType<NonNullable<T>>
  : Model<N>;

/** 这个函数保证在 model 中 useModel 的类型正确性 */
export const useModelSafeInModel = <N extends Namespaces, S>(
  namespace: N,
  selector: Selector<N, S>,
): SelectedModel<N, typeof selector> => {
  const model = useModel(namespace, selector);
  return model;
};
