import cx from 'classnames';
import { ReactNode } from 'react';
import { ColorUI, mkColor } from '../colors/color';

export type IconProps = Readonly<{
  size?: 'sx' | 'small' | 'medium';
  color?: ColorUI;
}>;

type Props = IconProps & Readonly<{ children: ReactNode }>;

export const Icon = ({
  size = 'medium',
  color = 'gray-medium',
  children,
}: Props) => {
  const isSx = size === 'sx';
  const isSmall = size === 'small';
  const isMedium = size === 'medium';
  const styles = cx(
    {
      'h-3': isSx,
      'w-3': isSx,
      'h-4': isSmall,
      'w-4': isSmall,
      'h-5': isMedium,
      'w-5': isMedium,
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
