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

export const signUp = (
  pond: Pond,
  displayName: string,
  email: Email,
  usersEmails: UsersEmails
): Promise<UserUUID | undefined> => {
  return new Promise((res) => {
    const canSignUp = isUserEmailRegistered(email, usersEmails) === false;
    if (canSignUp) {
      let userUUID = mkUserUUID();
      pond.run(UsersCatalogFish.fish, (_, enqueue) => {
        const event = mkUserAddedEvent(userUUID, displayName, email);
        const tags = mkUserAddedEventTags(userUUID);
        enqueue(tags, event);
        res(userUUID);
      });
    } else {
      res(undefined);
    }
  });
};

const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => email in usersEmails;

const mkUserUUID = (): UserUUID => uuid();

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

export const editUserProfile = (
  pond: Pond,
  users: Users,
  userUUID: UserUUID,
  displayName: string
): Promise<boolean> => {
  return new Promise((res) => {
    const isUserRegistered = isUserUUIDRegistered(userUUID, users);
    const sanitizedName = sanitizeDisplayName(displayName);
    const isNameNotEmpty = isDisplayNameEmpty(sanitizedName) === false;
    const canEditUserProfile = isUserRegistered && isNameNotEmpty;
    if (canEditUserProfile) {
      pond.run(UsersCatalogFish.fish, (_, enqueue) => {
        const tags = mkUserProfileEditedEventTags(userUUID);
        const event = mkUserProfileEditedEvent(userUUID, displayName);
        enqueue(tags, event);
        res(true);
      });
    } else {
      res(false);
    }
  });
};

//#endregion
