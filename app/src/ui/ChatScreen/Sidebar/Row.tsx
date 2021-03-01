import { ReactNode } from 'react';

export type RowProps = Readonly<{
  children: ReactNode;
  onClick: () => void;
}>;

export const Row = ({ children, onClick }: RowProps) => {
  return (
    <div
      className="flex items-center space-x-2 w-full h-6 pl-2 pr-2 hover:bg-gray-600 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
