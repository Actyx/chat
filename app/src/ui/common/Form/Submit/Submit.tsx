import classnames from 'classnames';

export type SubmitProps = Readonly<{
  children: string;
  full?: boolean;
}>;

export const Submit = ({ children, full = false }: SubmitProps) => {
  const styles = classnames(
    'bg-pink-900',
    'hover:bg-pink-800',
    'text-white',
    'text-xl',
    'font-bold',
    'font-extrabold',
    'py-2',
    'px-4',
    'rounded',
    'h-11',
    'p-2',
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
