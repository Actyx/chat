import { ReactNode, useState } from 'react';

export type CollapsibleListProps = Readonly<{
  iconOpen: ReactNode;
  iconClose: ReactNode;
  title: ReactNode;
  children: ReactNode;
}>;

export const CollapsibleList = ({
  iconOpen,
  iconClose,
  title,
  children,
}: CollapsibleListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        className="flex items-center h-7 space-x-2 pl-2 pr-2 cursor-pointer"
        onClick={handleOpen}
      >
        <div>{isOpen ? iconOpen : iconClose}</div>
        <div>{title}</div>
      </div>
      {isOpen && children}
    </div>
  );
};
