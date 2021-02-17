export type SorterOptions = Readonly<{
  isDescending: boolean;
}>;

type Comparator<T> = (a: T, b: T) => number;

export const localeComparator = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export const genericSorter = <T>(
  a: T,
  b: T,
  comparator: Comparator<T>,
  sorter: SorterOptions
) => (sorter.isDescending ? comparator(a, b) * -1 : comparator(a, b));
