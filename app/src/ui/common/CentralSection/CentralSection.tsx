import React, { ReactNode } from 'react';

type CentralSectionProps = Readonly<{
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}>;

const Body = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="overflow-y-auto h-full">{children}</div>
);

export const Header = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex items-center justify-between p-4 border-b h-16">
      {children}
    </div>
  );
};

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
