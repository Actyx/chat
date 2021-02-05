import React, { FC } from 'react';

type Props = Readonly<{
  userDisplayName?: string;
  editUserDisplayName: () => void;
}>;

export const TopBar: FC<Props> = ({ userDisplayName, editUserDisplayName }) => {
  return (
    <div>
      <div>
        <strong>{userDisplayName ?? ''}</strong>
      </div>
      <div onClick={() => editUserDisplayName()}>edit name</div>
    </div>
  );
};
