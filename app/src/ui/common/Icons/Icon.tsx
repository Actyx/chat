import cx from 'classnames';
import { ReactNode } from 'react';
import { ColorUI, mkColor } from '../colors/color';

type IconProps = Readonly<{
  size?: 'small';
  color?: ColorUI;
  children: ReactNode;
}>;

export const Icon = ({
  size = 'small',
  color = 'gray-medium',
  children,
}: IconProps) => {
  const isSmall = size === 'small';
  const styles = cx({ 'h-6': isSmall, 'w-6': isSmall }, mkColor('text')(color));

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
