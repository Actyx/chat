import { ReactNode } from 'react';

type SectionProps = Readonly<{
  children: ReactNode;
}>;

export const Section = ({ children }: SectionProps) => {
  return <div className="mb-2">{children}</div>;
};
