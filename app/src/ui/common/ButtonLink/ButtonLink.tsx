import { ReactNode } from 'react';
import { MouseEventButton } from '../../utils/ui-event-types';
import cx from 'classnames';

export type ButtonLinkBase = Readonly<{
  type: 'button' | 'submit';
  children: ReactNode;
  full?: boolean;
  click?: (e: MouseEventButton) => void;
}>;

type ButtonLinkButton = ButtonLinkBase &
  Readonly<{
    type: 'button';
    click: (e: MouseEventButton) => void;
  }>;

type ButtonLinkSumbit = ButtonLinkBase &
  Readonly<{
    type: 'submit';
  }>;

export type ButtonLinkProps = ButtonLinkButton | ButtonLinkSumbit;

export const ButtonLink = ({
  type,
  children,
  full,
  click,
}: ButtonLinkProps) => {
  const styles = cx('focus:outline-none', { 'w-full': full });

  return (
    <button type={type} className={styles} onClick={click}>
      {children}
    </button>
  );
};
