import cx from 'classnames';
import { ReactNode } from 'react';

type IconProps = Readonly<{
  size?: 'small';
  color?: 'gray-medium' | 'red-medium';
  children: ReactNode;
}>;

export const Icon = ({
  size = 'small',
  color = 'gray-medium',
  children,
}: IconProps) => {
  const isSmall = size === 'small';
  const styles = cx({
    'h-6': isSmall,
    'w-6': isSmall,
    'text-gray-700': color === 'gray-medium',
    'text-red-700': color === 'red-medium',
  });

  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {children}
    </svg>
  );
};
