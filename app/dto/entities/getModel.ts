// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ModelCtor } from 'sequelize';

export const getModel = <M>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _model: M,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): M extends ModelCtor<infer MM> ? MM : M => {};
