export const prepareString = (str: string) => str.trim();

export const isStringEmpty = (str: string) => str.trim().length === 0;

export type SorterOptions = Readonly<{
  isDescending: boolean;
}>;

export const localeComparator = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export const genericSort = <T>(
  a: T,
  b: T,
  compare: (a: T, b: T) => number,
  sorter: SorterOptions
) => (sorter.isDescending ? compare(a, b) * -1 : compare(a, b));
