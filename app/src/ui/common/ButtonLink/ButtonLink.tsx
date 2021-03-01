import { ReactNode } from 'react';
import { MouseEventButton } from '../../utils/ui-event-types';
import './button-link.css';

export type ButtonLinkProps = Readonly<{
  children: ReactNode;
  click: (e: MouseEventButton) => void;
}>;

export const ButtonLink = ({ children, click }: ButtonLinkProps) => {
  return (
    <button className="button-link" onClick={click}>
      {children}
    </button>
  );
};
