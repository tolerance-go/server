import { Op } from 'sequelize';

export type Conditions = {
  like?: string;
  notLike?: string;
  or?: Wheres[];
  and?: Wheres[];
  is?: string;
  eq?: string;
  ne?: string;
  not?: string;
  in?: string[];
  notIn?: string[];
  isNum?: number;
  neNum?: number;
  eqNum?: number;
  notNum?: number;
  inNum?: number[];
  notInNum?: number[];
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  between?: number[];
  notBetween?: number[];
};

export type ConditionsValueType = Conditions[keyof Conditions];

export type WhereItem = {
  fieldName: string;
  conditions: Conditions;
};

export type Wheres = {
  where: WhereItem[];
  or?: Wheres[];
  and?: Wheres[];
};

export const convertWhereToRuntime = (
  whereData?: Wheres | ConditionsValueType,
) => {
  if (typeof whereData === 'number' || typeof whereData === 'string') {
    return whereData;
  }

  if (whereData === undefined) {
    return undefined;
  }

  if (Array.isArray(whereData)) {
    return whereData.map((item) => convertWhereToRuntime(item));
  }

  const { where, or, and } = whereData;

  const getWhereOpts = (whereItems: WhereItem[]) => {
    return whereItems.reduce((acc, whereItem) => {
      const { conditions, fieldName } = whereItem;

      let hasKey = false;

      const opts = Object.keys(conditions).reduce((accc, conditionType) => {
        hasKey = true;

        const data = conditions[conditionType] as Exclude<
          ConditionsValueType,
          undefined
        >;
        return {
          ...accc,
          [Op[conditionType.replace(/Num$/, '')]]: convertWhereToRuntime(data),
        };
      }, {});

      if (hasKey === false) {
        return acc;
      }

      return {
        ...acc,
        [fieldName]: opts,
      };
    }, {});
  };

  const whereOpts = getWhereOpts(where);

  if (or || and) {
    if (or) {
      whereOpts[Op.or] = [
        whereOpts,
        ...or.map((item) => convertWhereToRuntime(item)),
      ];
    }
    if (and) {
      whereOpts[Op.and] = [
        whereOpts,
        ...and.map((item) => convertWhereToRuntime(item)),
      ];
    }
  }

  return whereOpts;
};
