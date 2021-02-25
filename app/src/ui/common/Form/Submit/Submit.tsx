import cx from 'classnames';

export type SubmitProps = Readonly<{
  children: string;
  full?: boolean;
}>;

export const Submit = ({ children, full = false }: SubmitProps) => {
  const styles = cx(
    'bg-pink-900 hover:bg-pink-800',
    'font-sans text-white text-xl font-bold font-extrabold',
    'rounded h-11 p-2',
    {
      'w-full': full,
    }
  );
  return (
    <button type="submit" className={styles}>
      {children}
    </button>
  );
};
