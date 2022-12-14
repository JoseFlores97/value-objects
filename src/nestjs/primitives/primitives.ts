/* eslint-disable @typescript-eslint/ban-types */
type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = Omit<
  { [key in keyof T]: T[key] },
  'autoCommit' | symbol
>;

type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type ValueObjectValue<T> = {
  [key in keyof T]: T[key] extends { value: unknown }
    ? Pick<T[key], 'value'>['value']
    : T[key] extends Array<{ value: unknown }>
    ? Pick<T[key][number], 'value'>['value'][]
    : T[key] extends Array<Object>
    ? Primitives<T[key][number]>[]
    : T[key] extends Date
    ? Date
    : T[key] extends Object
    ? Primitives<T[key]>
    : T[key];
};

export type Primitives<T> = ValueObjectValue<Properties<T>>;
