import { ReactNode } from 'react';

type HeaderProps = Readonly<{ children: ReactNode }>;

export const Header = ({ children }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b h-16">
      {children}
    </div>
  );
};
