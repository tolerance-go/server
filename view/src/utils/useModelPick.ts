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

export const useModelPick = <N extends Namespaces, K extends keyof Model<N>>(
  namespace: N,
  keys: K[],
): Pick<Model<N>, K> => {
  const model = useModel(namespace, (model) => pick(model, keys));
  return model;
};
