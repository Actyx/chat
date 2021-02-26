import cx from 'classnames';
import { ReactNode } from 'react';

export type AlertProps = Readonly<{
  type: 'secondary' | 'danger';
  full?: boolean;
  children: ReactNode;
}>;

export const Alert = ({ type, full = true, children }: AlertProps) => {
  const isSecondary = type === 'secondary';
  const isDanger = type === 'danger';

  const styles = cx('p-3 rounded text-left font-sans text-base', {
    'width-full': full,
    'bg-gray-100': isSecondary,
    'text-gray-800': isSecondary,
    'bg-red-100': isDanger,
    'text-red-800': isDanger,
  });

  return <div className={styles}>{children}</div>;
};
