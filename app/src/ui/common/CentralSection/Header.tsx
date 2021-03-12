import { ReactNode } from 'react';
import './header.css';

export const Header = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex items-center justify-between pl-4 pr-4 border-b central-section-header">
      {children}
    </div>
  );
};
