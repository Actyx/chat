import React, { FC, useContext } from 'react';
import {
  openSectionRightUserEditProfile,
  signOutActiveUser,
} from '../ui-state-manager/actions';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  userDisplayName: string;
}>;

export const TopBar: FC<Props> = ({ userDisplayName }) => {
  const dispatch = useContext(DispatchContextUI);

  const handleEditUserProfile = () =>
    dispatch(openSectionRightUserEditProfile());

  const handleSignOut = () => dispatch(signOutActiveUser());

  return (
    <div>
      <div>
        <strong>{userDisplayName ?? ''}</strong>{' '}
        <span onClick={handleEditUserProfile}>
          <strong>Edit</strong>
        </span>
        {' | '}
        <span onClick={handleSignOut}>
          <strong>Sign Out</strong>
        </span>
      </div>
    </div>
  );
};
