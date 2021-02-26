import cx from 'classnames';
import { ReactNode } from 'react';
import { Typography } from '../Typography/Typography';

type Variant = 'secondary' | 'danger';

export type AlertProps = Readonly<{
  variant: Variant;
  full?: boolean;
  children: ReactNode;
}>;

const color = (variant: Variant) => {
  switch (variant) {
    case 'secondary':
      return 'gray-dark';
    case 'danger':
      return 'red-dark';
  }
};
export const Alert = ({ variant, full = true, children }: AlertProps) => {
  const styles = cx('p-3 rounded', {
    'width-full': full,
    'bg-gray-100': variant === 'secondary',
    'bg-red-100': variant === 'danger',
  });

  return (
    <div className={styles}>
      <Typography align="left" color={color(variant)}>
        {children}
      </Typography>
    </div>
  );
};
