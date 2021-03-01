import { ReactNode } from 'react';
import { ButtonLink } from '../../common/ButtonLink/ButtonLink';

export type RowProps = Readonly<{
  children: ReactNode;
  onClick: () => void;
}>;

export const Row = ({ children, onClick }: RowProps) => {
  return (
    <div className="w-full h-6 pl-2 pr-2 hover:bg-gray-600 cursor-pointer">
      <ButtonLink click={onClick}>
        <div className="flex items-center space-x-2">{children}</div>
      </ButtonLink>
    </div>
  );
};
