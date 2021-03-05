import { ReactNode } from 'react';
import './sidebar.css';

type BodyProps = Readonly<{ children: ReactNode }>;

export const Body = ({ children }: BodyProps) => {
  return (
    <div
      style={{ height: 'calc(100% - 5rem)' }}
      className="overflow-y-auto sidebar-content"
    >
      {children}
    </div>
  );
};
