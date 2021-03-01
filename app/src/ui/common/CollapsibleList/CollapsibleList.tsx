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
      <div className="flex items-center space-x-2" onClick={handleOpen}>
        <div>{isOpen ? iconOpen : iconClose}</div>
        <div>{title}</div>
      </div>
      {isOpen && children}
    </div>
  );
};
