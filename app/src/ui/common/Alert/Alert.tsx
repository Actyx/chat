import cx from 'classnames';
import { ReactNode } from 'react';
import { Typography, TypographyColorUI } from '../Typography/Typography';

type Variant = 'secondary' | 'danger' | 'success';

export type AlertProps = Readonly<{
  variant: Variant;
  full?: boolean;
  children: ReactNode;
}>;

const color = (variant: Variant): TypographyColorUI => {
  switch (variant) {
    case 'secondary':
      return 'gray-dark';
    case 'danger':
      return 'red-dark';
    case 'success':
      return 'green-dark';
  }
};

export const Alert = ({ variant, full = true, children }: AlertProps) => {
  const styles = cx('p-3 rounded', {
    'width-full': full,
    'bg-gray-100': variant === 'secondary',
    'bg-red-100': variant === 'danger',
    'bg-green-100': variant === 'success',
  });

  return (
    <div className={styles}>
      <Typography align="left" color={color(variant)}>
        {children}
      </Typography>
    </div>
  );
};
