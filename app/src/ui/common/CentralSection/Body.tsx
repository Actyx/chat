import { ReactNode } from 'react';

export const Body = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="overflow-y-auto h-full">{children}</div>
);
