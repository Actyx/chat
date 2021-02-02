/*
A user sign-up to the system providing a display name and email, 
if the email provided is not already in the system, the system will register the user and return him a unique identifier, 
the user will automatically sign-in. 
If the email already exists in the system the user won't be able to sign-up
*/

import { UserUniqueIdentifier } from '../../common-types';
import { mkUserAddedEvent } from '../make-events';
import { Email, UsersEmails } from '../types';
import { v4 as uuid } from 'uuid';
import { pondSingletone } from '../../../App';
import { UsersCatalogFish } from '../users-catalog-fish';

const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => {
  return email in usersEmails;
};

export const signUpUserWithEmail = (
  displayName: string,
  email: Email,
  usersEmails?: UsersEmails
): UserUniqueIdentifier | undefined => {
  if (usersEmails === undefined) {
    return undefined;
  }
  const isUserRegistered = isUserEmailRegistered(email, usersEmails);

  if (isUserRegistered === false) {
    const uniqueId = uuid();
    const event = mkUserAddedEvent(uniqueId, displayName, email);

    const tags = UsersCatalogFish.tags.user.and(
      UsersCatalogFish.tags.usersCatalog
    );

    pondSingletone?.emit(tags, event);
  } else {
    window.alert('user has been already signup');
    return undefined;
  }
};
