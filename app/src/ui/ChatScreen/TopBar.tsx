import React, { FC } from 'react';

type Props = Readonly<{
  user: string;
}>;

export const TopBar: FC<Props> = ({ user }) => {
  return <div>{user}</div>;
};
