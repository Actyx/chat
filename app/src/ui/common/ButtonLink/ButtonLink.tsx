import { ReactNode } from 'react';
import { MouseEventButton } from '../../utils/ui-event-types';

export type ButtonLinkProps = Readonly<{
  children: ReactNode;
  click: (e: MouseEventButton) => void;
}>;

export const ButtonLink = ({ children, click }: ButtonLinkProps) => {
  return (
    <button style={{ outline: 'none' }} onClick={click}>
      {children}
    </button>
  );
};
