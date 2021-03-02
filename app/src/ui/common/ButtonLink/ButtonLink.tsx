import { ReactNode } from 'react';
import { MouseEventButton } from '../../utils/ui-event-types';
import cx from 'classnames';

export type ButtonLinkProps = Readonly<{
  children: ReactNode;
  full?: boolean;
  click: (e: MouseEventButton) => void;
}>;

export const ButtonLink = ({ children, full, click }: ButtonLinkProps) => {
  const styles = cx({ 'w-full': full });
  return (
    <button style={{ outline: 'none' }} className={styles} onClick={click}>
      {children}
    </button>
  );
};
