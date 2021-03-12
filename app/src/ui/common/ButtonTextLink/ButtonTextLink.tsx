import { MouseEvent } from 'react';
import { Typography } from '../Typography/Typography';

export type ButtonTextLinkProps = Readonly<{
  children: string;
  click: (e: MouseEvent<HTMLButtonElement>) => void;
}>;

export const ButtonTextLink = ({ children, click }: ButtonTextLinkProps) => {
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
