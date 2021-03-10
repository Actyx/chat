import cn from 'classnames';
import { ReactNode } from 'react';
import { ColorUI, mkColor } from '../../utils/colors';

export type IconProps = Readonly<{
  fill?: boolean;
  size?: 'xs' | 'sm' | 'base';
  color?: ColorUI;
}>;

type Props = IconProps & Readonly<{ children: ReactNode }>;

export const Icon = ({
  fill = false,
  size = 'base',
  color = 'gray-medium',
  children,
}: Props) => {
  const isSx = size === 'xs';
  const isSmall = size === 'sm';
  const isMedium = size === 'base';
  const styles = cn(
    {
      'h-3': isSx,
      'w-3': isSx,
      'h-4': isSmall,
      'w-4': isSmall,
      'h-5': isMedium,
      'w-5': isMedium,
      'fill-current': fill,
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
