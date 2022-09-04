import { pick } from 'lodash';

export const pickModel =
  <M, K extends keyof M>(keys: K[]) =>
  (model: M) => {
    return pick(model, keys) as Pick<M, K>;
  };
