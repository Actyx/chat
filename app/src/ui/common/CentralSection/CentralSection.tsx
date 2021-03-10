import React, { ReactNode } from 'react';
import { Body } from './Body';
import { Header } from './Header';

type CentralSectionProps = Readonly<{
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}>;

export const CentralSection = ({
  header,
  body,
  footer,
}: CentralSectionProps) => {
  return (
    <div className="w-full overflow-y-auto	h-full">
      <div className="flex flex-col h-full">
        <Header>{header}</Header>
        <Body>{body}</Body>
        {footer}
      </div>
    </div>
  );
};
