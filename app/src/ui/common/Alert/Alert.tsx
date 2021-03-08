import cx from 'classnames';
import { ReactNode } from 'react';
import { ColorUI } from '../../utils/ui-colors';
import { Typography } from '../Typography/Typography';

type Variant = 'secondary' | 'danger' | 'warning' | 'success';

export type AlertProps = Readonly<{
  variant: Variant;
  full?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}>;

const color = (variant: Variant): ColorUI => {
  switch (variant) {
    case 'secondary':
      return 'gray-dark';
    case 'danger':
      return 'red-dark';
    case 'success':
      return 'green-dark';
    case 'warning':
      return 'yellow-dark';
  }
};

export const Alert = ({ variant, full = true, icon, children }: AlertProps) => {
  const styles = cx('p-3 rounded', {
    'flex space-x-2': icon,
    'width-full': full,
    'bg-gray-100': variant === 'secondary',
    'bg-red-100': variant === 'danger',
    'bg-green-100': variant === 'success',
    'bg-yellow-100': variant === 'warning',
  });

  return (
    <div className={styles}>
      {icon && icon}
      <Typography tag="div" align="left" color={color(variant)}>
        {children}
      </Typography>
    </div>
  );
};
