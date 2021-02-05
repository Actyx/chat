import React, { FC, useContext } from 'react';
import { openSectionRightUserEditProfile } from '../ui-state-manager/actions';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  userDisplayName: string;
}>;

export const TopBar: FC<Props> = ({ userDisplayName }) => {
  const dispatch = useContext(DispatchContextUI);

  const handleEditUserProfile = () =>
    dispatch(openSectionRightUserEditProfile());

  return (
    <div>
      <div>
        <strong>{userDisplayName ?? ''}</strong>{' '}
        <span onClick={handleEditUserProfile}>(click to EDIT)</span>
      </div>
    </div>
  );
};
