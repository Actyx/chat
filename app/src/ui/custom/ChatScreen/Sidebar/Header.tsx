import React from 'react';
import { Typography } from '../../../common/Typography/Typography';

type HeaderProps = Readonly<{
  appName: string;
}>;

export const Header = ({ appName }: HeaderProps) => {
  return (
    <div className="flex items-center p-4 border-solid border-b border-gray-600 h-16 mb-4">
      <Typography size="base" color="white" weight="semibold">
        {appName}
      </Typography>
    </div>
  );
};
