import { ReactNode, useState } from 'react';
import { ChevronDownIcon } from '../../common/Icons/ChevronDownIcon';
import { ChevronRightIcon } from '../../common/Icons/ChevronRightIcon';
import { Typography } from '../../common/Typography/Typography';

type CollapsibleListProps = Readonly<{
  title: string;
  children: ReactNode;
}>;

export const CollapsibleList = ({ title, children }: CollapsibleListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="flex items-center space-x-1" onClick={handleOpen}>
        <div>{isOpen ? ChevronDownIcon : ChevronRightIcon}</div>
        <Typography tag="div" color="gray-light" weight="medium">
          {title}
        </Typography>
      </div>
      {isOpen && children}
    </div>
  );
};
