import {
  mkUserAddedEvent,
  mkUserAddedEventTags,
  mkUserProfileEditedEvent,
  mkUserProfileEditedEventTags,
} from './events';
import { Email, Users, UsersEmails, UserUUID } from './types';
import { v4 as uuid } from 'uuid';
import { Pond } from '@actyx/pond';
import { UsersCatalogFish } from './users-catalog-fish';

//#region Sign-up

export const signUp = (pond: Pond) => (makerUUID: () => UserUUID) => async (
  displayName: string,
  email: Email
): Promise<UserUUID | undefined> => {
  const userUUID = makerUUID();
  let isSuccess = false;
  await pond
    .run(UsersCatalogFish.fish, (fishState, enqueue) => {
      const canSignUp =
        isUserEmailRegistered(email, fishState.emails) === false;
      if (canSignUp) {
        const event = mkUserAddedEvent(userUUID, displayName, email);
        const tags = mkUserAddedEventTags(userUUID);
        enqueue(tags, event);
        isSuccess = true;
      }
    })
    .toPromise();
  return isSuccess ? userUUID : undefined;
};

const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => email in usersEmails;

export const mkUserUUID = (): UserUUID => uuid();

//#endregion

//#region Sign-in

export const isUserUUIDRegistered = (
  userUUID: UserUUID,
  users: Users
): boolean => userUUID in users;

export const signIn = (userUUID: UserUUID, users: Users): boolean => {
  const canSignIn = isUserUUIDRegistered(userUUID, users);
  return canSignIn;
};

//#endregion

//#region User profile edit

export const getDisplayNameByUserUUID = (
  userUUID: UserUUID,
  users: Users
): string | undefined => users[userUUID].displayName;

const sanitizeDisplayName = (displayName: string) => displayName.trim();

const isDisplayNameEmpty = (displayName: string) => displayName.length === 0;

export const editUserProfile = (pond: Pond) => async (
  userUUID: UserUUID,
  displayName: string
): Promise<boolean> => {
  let isSuccess = false;
  await pond
    .run(UsersCatalogFish.fish, (fishState, enqueue) => {
      const isUserRegistered = isUserUUIDRegistered(userUUID, fishState.users);
      const sanitizedName = sanitizeDisplayName(displayName);
      const isNameNotEmpty = isDisplayNameEmpty(sanitizedName) === false;
      const canEditUserProfile = isUserRegistered && isNameNotEmpty;
      if (canEditUserProfile) {
        const tags = mkUserProfileEditedEventTags(userUUID);
        const event = mkUserProfileEditedEvent(userUUID, displayName);
        enqueue(tags, event);
        isSuccess = true;
      }
    })
    .toPromise();
  return isSuccess;
};

//#endregion
