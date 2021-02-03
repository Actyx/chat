import { mkUserAddedEvent } from './make-events';
import { Email, Users, UsersEmails, UserUniqueIdentifier } from './types';
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
  userUniqueIdentifier?: UserUniqueIdentifier;
}> => {
  const canSignUp = isUserEmailRegistered(email, usersEmails) === false;
  let userUniqueIdentifier = mkUserUniqueIdentifier();
  if (canSignUp) {
    emitUserAddedEventToPond(pond, userUniqueIdentifier, displayName, email);
  }
  return {
    success: canSignUp,
    userUniqueIdentifier: canSignUp ? userUniqueIdentifier : undefined,
  };
};

const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => email in usersEmails;

const emitUserAddedEventToPond = (
  pond: Pond,
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string,
  email: string
): void => {
  const tags = UsersCatalogFish.tags.user
    .and(UsersCatalogFish.tags.usersCatalog)
    .and(UsersCatalogFish.tags.user.withId(userUniqueIdentifier));
  const event = mkUserAddedEvent(userUniqueIdentifier, displayName, email);
  pond.emit(tags, event);
};

const mkUserUniqueIdentifier = (): UserUniqueIdentifier => uuid();

//#endregion

//#region Sign-in

export const signIn = (
  userUniqueIdentifier: UserUniqueIdentifier,
  users: Users
): Readonly<{ success: boolean }> => ({
  success: userUniqueIdentifier in users,
});

//#endregion
