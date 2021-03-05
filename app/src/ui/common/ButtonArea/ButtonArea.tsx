import { ReactNode } from 'react';
import { MouseEventButton } from '../../utils/ui-event-types';
import cx from 'classnames';

export type ButtonAreaBase = Readonly<{
  type: 'button' | 'submit';
  children: ReactNode;
  full?: boolean;
  click?: (e: MouseEventButton) => void;
}>;

type ButtonAreaButton = ButtonAreaBase &
  Readonly<{
    type: 'button';
    click: (e: MouseEventButton) => void;
  }>;

type ButtonAreaSumbit = ButtonAreaBase &
  Readonly<{
    type: 'submit';
  }>;

export type ButtonAreaProps = ButtonAreaButton | ButtonAreaSumbit;

export const ButtonLink = ({
  type,
  children,
  full,
  click,
}: ButtonAreaProps) => {
  const styles = cx('focus:outline-none focus-visible:ring', {
    'w-full': full,
  });

  return (
    <button type={type} className={styles} onClick={click}>
      {children}
    </button>
  );
};
