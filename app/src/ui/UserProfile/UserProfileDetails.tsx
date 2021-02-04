import React, { FC } from 'react';
import { UserUniqueIdentifier } from '../../business-logic/users-catalog-fish/types';
import { ContextDispatchUI } from '../context/ui-context';

type Props = Readonly<{
  isEditProfileSuccess?: boolean;
  editUserProfile: (
    userUniqueIdentifier: UserUniqueIdentifier,
    displayName: string
  ) => void;
}>;

export const UserProfileDetails: FC<Props> = ({
  isEditProfileSuccess,
  editUserProfile,
}) => {
  const [
    userUniqueIdentifier,
    setUserUniqueIdentifier,
  ] = React.useState<UserUniqueIdentifier>('');

  const [displayName, setDisplayName] = React.useState<string>('');

  const handleChangeUserUniqueIdentifier = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setUserUniqueIdentifier(e.target.value);

  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDisplayName(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    editUserProfile(userUniqueIdentifier, displayName);
    e.preventDefault();
  };

  return (
    <ContextDispatchUI.Consumer>
      {() => (
        <div>
          <h2>Edit user profile </h2>
          <form onSubmit={handleSubmit}>
            <label>userUniqueIdentifier:</label>
            <input
              type="text"
              required
              value={userUniqueIdentifier}
              onChange={handleChangeUserUniqueIdentifier}
            />
            <br />
            <label>displayName:</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={handleChangeDisplayName}
            />
            <br />
            <input type="submit" value="Edit display name" />
            <br />
            {isEditProfileSuccess === undefined
              ? ''
              : isEditProfileSuccess === true
              ? 'success: user profile edited'
              : 'error: cannot edit user profile'}
          </form>
        </div>
      )}
    </ContextDispatchUI.Consumer>
  );
};
