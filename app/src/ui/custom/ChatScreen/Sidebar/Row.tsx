import { ReactNode } from 'react';
import { ButtonArea } from '../../../common/ButtonArea/ButtonArea';

export type RowProps = Readonly<{
  children: ReactNode;
  onClick: () => void;
}>;

export const Row = ({ children, onClick }: RowProps) => {
  return (
    <div className="w-full h-7 pl-2 pr-2 hover:bg-gray-600 cursor-pointer">
      <ButtonArea type="button" full click={onClick}>
        <div className="flex items-center space-x-2">{children}</div>
      </ButtonArea>
    </div>
  );
};
