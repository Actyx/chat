import { Tags } from '@actyx/pond';

export type ReadonlyArrayOfOneOrMore<T> = readonly [T, ...T[]];

export type ReadonlyArrayOfOne<T> = readonly [T];

export type TagsWithEvent<T> = [Tags<T>, T];
