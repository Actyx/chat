import React, { FC } from 'react';

type Props = Readonly<{
  userDisplayName: string;
}>;

export const TopBar: FC<Props> = ({ userDisplayName }) => {
  return <div>{userDisplayName}</div>;
};
