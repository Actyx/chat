import cx from 'classnames';

export type SubmitProps = Readonly<{
  color?: 'purple' | 'green' | 'white';
  size?: 'big' | 'small';
  full?: boolean;
  children: string;
}>;

export const Submit = ({
  color = 'purple',
  size = 'big',
  full = false,
  children,
}: SubmitProps) => {
  const isWhite = color === 'white';
  const isGreen = color === 'green';
  const isPurple = color === 'purple';
  const isBig = size === 'big';
  const isSmall = size === 'small';

  const styles = cx(
    'rounded',
    'font-sans',
    { 'w-full': full },
    { 'bg-purple-900 hover:bg-purple-800': isPurple },
    { 'bg-green-700 hover:bg-green-600': isGreen },
    { 'bg-white': isWhite },
    { 'border border-gray-400': isWhite },
    { 'font-semibold': !isWhite },
    { 'font-normal': isWhite },
    { 'text-base': isSmall },
    { 'text-xl': isBig },
    { 'text-white': !isWhite },
    { 'text-gray-700': isWhite },
    { 'h-11': isBig },
    { 'h-9': isSmall },
    { 'pt-2 pb-2 pl-4 pr-4': isBig },
    { 'pl-3 pr-3': isSmall }
  );
  return (
    <button type="submit" className={styles}>
      {children}
    </button>
  );
};
