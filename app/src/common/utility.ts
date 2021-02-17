export const prepareString = (str: string) => str.trim();

export const isStringEmpty = (str: string) => str.trim().length === 0;

export type SorterOptions = Readonly<{
  isDescending: boolean;
}>;

// type Comparator = <T>(a: T, b: T) => number; //FIXME use Comparator in genericSort

export const localeComparator = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export const genericSort = <T>(
  a: T,
  b: T,
  comparator: (a: T, b: T) => number,
  sorter: SorterOptions
) => (sorter.isDescending ? comparator(a, b) * -1 : comparator(a, b));
