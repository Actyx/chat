import cx from 'classnames';
import { ReactNode } from 'react';
import { ColorUI } from '../colors/color';
import { Typography } from '../Typography/Typography';

type Variant = 'secondary' | 'danger' | 'success';

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
  }
};

export const Alert = ({ variant, full = true, icon, children }: AlertProps) => {
  const styles = cx('p-3 rounded', {
    'flex space-x-2': icon,
    'width-full': full,
    'bg-gray-100': variant === 'secondary',
    'bg-red-100': variant === 'danger',
    'bg-green-100': variant === 'success',
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
