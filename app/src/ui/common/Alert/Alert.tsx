import cx from 'classnames';
import { ReactNode } from 'react';

export type AlertProps = Readonly<{
  type: 'secondary';
  full?: boolean;
  children: ReactNode;
}>;

export const Alert = ({ type, full = true, children }: AlertProps) => {
  const isSecondary = type === 'secondary';

  const styles = cx('p-3 rounded text-left font-sans text-base', {
    'width-full': full,
    'bg-gray-100': isSecondary,
    'text-gray-800': isSecondary,
  });

  return <div className={styles}>{children}</div>;
};
