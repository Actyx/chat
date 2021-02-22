import { FC, useContext } from 'react';
import {
  showUserProfileEditSection,
  signOutActiveUser,
} from '../ui-state-manager/actions';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  userDisplayName: string;
}>;

export const TopBar: FC<Props> = ({ userDisplayName }) => {
  const dispatch = useContext(DispatchContextUI);

  const handleEditUserProfile = () => dispatch(showUserProfileEditSection());

  const handleSignOut = () => dispatch(signOutActiveUser());

  return (
    <div>
      <div>
        <strong>{userDisplayName ?? ''}</strong>{' '}
        <button onClick={handleEditUserProfile}>
          <strong>Edit</strong>
        </button>
        <button onClick={handleSignOut}>
          <strong>Sign Out</strong>
        </button>
      </div>
    </div>
  );
};
