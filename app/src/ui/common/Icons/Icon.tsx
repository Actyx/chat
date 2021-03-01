import cx from 'classnames';
import { ReactNode } from 'react';
import { ColorUI, mkColor } from '../colors/color';

export type IconBaseProps = Readonly<{
  size?: 'small' | 'medium';
  color?: ColorUI;
}>;

type IconProps = IconBaseProps & Readonly<{ children: ReactNode }>;

export const Icon = ({
  size = 'medium',
  color = 'gray-medium',
  children,
}: IconProps) => {
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  const styles = cx(
    {
      'h-4': isSmall,
      'w-4': isSmall,
      'h-6': isMedium,
      'w-6': isMedium,
    },
    mkColor('text')(color)
  );

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
