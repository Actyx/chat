import React, { ReactNode } from 'react';
import { Header } from '../FlexPanel/Header';

type CentralSectionProps = Readonly<{
  header: ReactNode;
  body: ReactNode;
}>;

const Body = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="overflow-y-auto channel-content-body">{children}</div>
);

export const CentralSection = ({ header, body }: CentralSectionProps) => {
  return (
    <div className="w-full overflow-y-auto	h-full">
      <div className="flex flex-col h-full">
        <Header>{header}</Header>
        <Body>{body}</Body>
      </div>
    </div>
  );
};
