export type ReadonlyArrayOfOneOrMore<T> = {
  0: T;
} & ReadonlyArray<T>;

export type ReadonlyArrayOfOne<T> = readonly [T];
