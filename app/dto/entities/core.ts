import { Model, ModelCtor } from 'sequelize';
import { Union } from 'ts-toolbelt';
type FilterString<T> = T extends string ? T : never;
type GetModel<MC> = MC extends ModelCtor<infer M> ? M : MC;
export type DTOName = string;

export type DTOKey = string;

export type DTOStringField<
  Required extends boolean | undefined = boolean | undefined,
> = {
  type: 'string';
  required: Required;
  example?: string;
  enum?: string[];
};

export type DTOArrayField<
  IT extends 'string' | 'integer' | 'number' = 'string' | 'integer' | 'number',
  Required extends boolean | undefined = boolean | undefined,
  IncludesDTOName extends DTOName = never,
> = {
  type: 'array';
  itemType: IT | IncludesDTOName;
  example?: string;
  required: Required;
};

export type DTOIntegerField<
  Required extends boolean | undefined = boolean | undefined,
> = {
  type: 'integer';
  required: Required;
  example?: string;
  enum?: number[];
};

export type DTONumberField<
  Required extends boolean | undefined = boolean | undefined,
> = {
  type: 'number';
  required: Required;
  example?: string;
  enum?: number[];
};

export type DTOBooleanField<
  Required extends boolean | undefined = boolean | undefined,
> = {
  type: 'boolean';
  required: Required;
  example?: string;
};

export type DTOCustomField<
  Required extends boolean | undefined = boolean | undefined,
  IncludesDTOName extends DTOName = never,
> = {
  type: IncludesDTOName;
  required: Required;
};

export type DTOField<
  IncludesDTOName extends DTOName = never,
  Required extends boolean | undefined = boolean | undefined,
> =
  | DTOStringField<Required>
  | DTOArrayField<'string' | 'integer' | 'number', Required, IncludesDTOName>
  | DTOIntegerField<Required>
  | DTONumberField<Required>
  | DTOBooleanField<Required>
  | DTOCustomField<Required, IncludesDTOName>;

export type DTOFieldKey = string;

export type DTO<IncludesDTOName extends DTOName = never> = Record<
  DTOFieldKey,
  DTOField<IncludesDTOName>
>;

export type DTOWithModel<Model, IncludesDTOName extends DTOName = never> = {
  // 没有使用 Required<Model>[Key] 而是使用 NonNullable，
  // 因为 NonNullable 会把 undefined 和 null 都去掉
  // 这里假设客户端获取到的数据会自动过滤掉值为 null 的字段
  [Key in keyof Required<Model>]: Model[Key] extends NonNullable<Model[Key]>
    ? Model[Key] extends string
      ? DTOStringField<true>
      : Model[Key] extends Array<infer IT>
      ? IT extends string
        ? DTOArrayField<'string', true, IncludesDTOName>
        : IT extends number
        ? DTOArrayField<'integer' | 'number', true, IncludesDTOName>
        : DTOArrayField<'string' | 'integer' | 'number', true, IncludesDTOName>
      : Model[Key] extends number
      ? DTOIntegerField<true> | DTONumberField<true>
      : Model[Key] extends boolean
      ? DTOBooleanField<true>
      : DTOCustomField<true, IncludesDTOName>
    : NonNullable<Model[Key]> extends string
    ? DTOStringField<false | undefined>
    : NonNullable<Model[Key]> extends Array<infer IT>
    ? IT extends string
      ? DTOArrayField<'string', false | undefined, IncludesDTOName>
      : IT extends number
      ? DTOArrayField<'integer' | 'number', false | undefined, IncludesDTOName>
      : DTOArrayField<
          'string' | 'integer' | 'number',
          false | undefined,
          IncludesDTOName
        >
    : NonNullable<Model[Key]> extends number
    ? DTOIntegerField<false | undefined> | DTONumberField<false | undefined>
    : NonNullable<Model[Key]> extends boolean
    ? DTOBooleanField<false | undefined>
    : DTOCustomField<false | undefined, IncludesDTOName>;
};

export type DTOGroup<IncludesDTOName extends DTOName = never> = Record<
  DTOKey,
  DTO<IncludesDTOName>
>;

export type DTOGroupWithModelCtorGroup<
  ModelCtorGroup,
  IncludesDTOName extends DTOName = never,
> = {
  [Key in keyof ModelCtorGroup]: DTOWithModel<
    Omit<GetModel<ModelCtorGroup[Key]>, keyof Model>,
    IncludesDTOName
  >;
};

type ModelCtorGroup = Record<string, ModelCtor<Model>>;

export function defineDTOGroup<DG extends DTOGroup>(dto: DG): DG;

export function defineDTOGroup<
  DG extends DTOGroup<FilterString<keyof Union.Merge<IncludeDTOGroup>>>,
  IncludeDTOGroup extends DTOGroup<string>,
>(
  dto: DG,
  opts: {
    include: IncludeDTOGroup[];
  },
): DG;

export function defineDTOGroup(
  dto: DTOGroup,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opts?: {
    include: DTOGroup[];
  },
) {
  return dto;
}


export function defineDTOEntitiesGroup<
  MG extends ModelCtorGroup,
  DG extends DTOGroupWithModelCtorGroup<MG>,
>(models: MG, dto: DG): DG;

export function defineDTOEntitiesGroup<
  MG extends ModelCtorGroup,
  IncludeDTOGroup extends DTOGroup,
  DG extends DTOGroupWithModelCtorGroup<
    MG,
    FilterString<keyof Union.Merge<IncludeDTOGroup>>
  >,
>(
  model: MG,
  dto: DG,
  opts: {
    include: IncludeDTOGroup[];
  },
): DG;

export function defineDTOEntitiesGroup(
  _model: ModelCtorGroup,
  dto: DTOGroupWithModelCtorGroup<ModelCtorGroup>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opts?: {
    include: DTOGroup[];
  },
) {
  return dto;
}

export function defineDTO<DG extends DTO>(dto: DG) {
  return dto;
}
