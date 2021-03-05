import { MouseEvent } from 'react';

export type LinkProps = Readonly<{
  children: string;
  click: (e: MouseEvent<HTMLButtonElement>) => void;
}>;

export const Link = ({ children, click }: LinkProps) => {
  return (
    <button
      className="font-semibold no-underline text-blue-700 hover:text-blue-900 hover:underline focus:outline-none focus:ring"
      onClick={click}
    >
      {children}
    </button>
  );
};
