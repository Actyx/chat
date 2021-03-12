import React, { ReactNode } from 'react';

type BodyProps = Readonly<{
  children: ReactNode;
}>;

export const Body = ({ children }: BodyProps) => {
  return <div className="pl-7 pr-7">{children}</div>;
};
