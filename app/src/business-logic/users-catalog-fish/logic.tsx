import { UserUniqueIdentifier } from '../common-types';
import { mkUserAddedEvent } from './make-events';
import { Email, Users, UsersEmails } from './types';
import { v4 as uuid } from 'uuid';
import { UsersCatalogFish } from './users-catalog-fish';
import { Pond } from '@actyx/pond';

//#region Sign-up

export const signUp = (
  pond: Pond,
  displayName: string,
  email: Email,
  usersEmails: UsersEmails
): Readonly<{
  success: boolean;
  userUniqueIdentifier: UserUniqueIdentifier | undefined;
}> => {
  const canSignUp = isUserEmailRegistered(email, usersEmails) === false;
  let userUniqueIdentifier = mkUserUniqueIdentifier();
  if (canSignUp) {
    sendUserAddedEventToPond(pond, userUniqueIdentifier, displayName, email);
  }
  return {
    success: canSignUp,
    userUniqueIdentifier: canSignUp ? userUniqueIdentifier : undefined,
  };
};

const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => {
  return email in usersEmails;
};

const sendUserAddedEventToPond = (
  pond: Pond,
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string,
  email: string
) => {
  const tags = UsersCatalogFish.tags.user.and(
    UsersCatalogFish.tags.usersCatalog
  );
  const event = mkUserAddedEvent(userUniqueIdentifier, displayName, email);
  pond.emit(tags, event);
};

const mkUserUniqueIdentifier = (): UserUniqueIdentifier => uuid();

//#endregion

//#region Sign-in

export const signIn = (
  userUniqueIdentifier: UserUniqueIdentifier,
  users: Users
) => ({
  success: userUniqueIdentifier in users,
});

//#endregion
