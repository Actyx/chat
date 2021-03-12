import React from 'react';
import { ButtonArea } from '../ButtonArea/ButtonArea';
import { XIcon } from '../Icons/XIcon';
import { Typography } from '../Typography/Typography';

type HeaderProps = Readonly<{
  title: string;
  close: () => void;
}>;

export const Header = ({ title, close }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center h-full pt-5 pb-5 pl-7 pr-7">
      <Typography size="xxl2" weight="bold" color="gray-dark">
        {title}
      </Typography>
      <ButtonArea type="button" click={close}>
        <div className="flex justify-center	items-center w-10 h-10 hover:bg-gray-100 rounded">
          <XIcon />
        </div>
      </ButtonArea>
    </div>
  );
};
