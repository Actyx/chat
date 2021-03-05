import { MouseEvent } from 'react';
import { Typography } from '../Typography/Typography';

export type LinkProps = Readonly<{
  children: string;
  click: (e: MouseEvent<HTMLButtonElement>) => void;
}>;

export const Link = ({ children, click }: LinkProps) => {
  return (
    <button
      className="no-underline hover:underline focus:outline-none focus:ring hover:text-blue-900"
      onClick={click}
    >
      <Typography color="blue-medium" weight="semibold">
        {children}
      </Typography>
    </button>
  );
};
