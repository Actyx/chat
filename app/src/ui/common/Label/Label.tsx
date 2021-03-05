import { ReactNode } from 'react';
import { Typography } from '../Typography/Typography';

export type LabelProps = Readonly<{
  children: ReactNode;
  htmlFor?: string;
}>;

export const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor}>
      <Typography weight="semibold" color="gray-dark">
        {children}
      </Typography>
    </label>
  );
};
