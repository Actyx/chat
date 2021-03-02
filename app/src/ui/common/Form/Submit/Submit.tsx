import cx from 'classnames';

export type SubmitProps = Readonly<{
  color?: 'purple-dark' | 'green-medium';
  size?: 'big' | 'small';
  full?: boolean;
  children: string;
}>;

export const Submit = ({
  color = 'purple-dark',
  size = 'big',
  full = false,
  children,
}: SubmitProps) => {
  const styles = cx(
    { 'bg-purple-900 hover:bg-purple-800': color === 'purple-dark' },
    { 'bg-green-700 hover:bg-green-600': color === 'green-medium' },
    'font-sans text-white text-xl font-bold',
    'rounded',
    { 'h-11': size === 'big' },
    { 'h-9': size === 'small' },
    { 'pt-2 pb-2 pl-4 pr-4': size === 'big' },
    { 'pl-3 pr-3': size === 'small' },
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
