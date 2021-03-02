import { ReactNode } from 'react';
import { MouseEventButton } from '../../utils/ui-event-types';

export type ButtonLinkProps = Readonly<{
  children: ReactNode;
  full?: boolean;
  click: (e: MouseEventButton) => void;
}>;

export const ButtonLink = ({ children, full, click }: ButtonLinkProps) => {
  return (
    <button style={{ outline: 'none' }} className="w-full" onClick={click}>
      {children}
    </button>
  );
};
