import { MouseEvent } from 'react';

export type ButtonProps = Readonly<{
  children: string;
  click: (e: MouseEvent<HTMLButtonElement>) => void;
}>;

export const Button = ({ children, click }: ButtonProps) => {
  return (
    <button
      className="font-semibold no-underline text-blue-700 hover:text-blue-900 hover:underline"
      onClick={click}
    >
      {children}
    </button>
  );
};
