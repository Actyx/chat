import {
  sendUserAddedEventToPond,
  sendUserProfileEditedEventToPond,
} from './events';
import { Email, Users, UsersEmails, UserUUID } from './types';
import { v4 as uuid } from 'uuid';
import { Pond } from '@actyx/pond';

//#region Sign-up

export const signUp = (
  pond: Pond,
  displayName: string,
  email: Email,
  usersEmails: UsersEmails
): Readonly<{
  success: boolean;
  userUUID?: UserUUID;
}> => {
  const canSignUp = isUserEmailRegistered(email, usersEmails) === false;
  let userUUID = mkUserUUID();
  if (canSignUp) {
    sendUserAddedEventToPond(pond, userUUID, displayName, email);
  }
  return {
    success: canSignUp,
    userUUID: canSignUp ? userUUID : undefined,
  };
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

export const getDisplayForFromUserUUID = (
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
): boolean => {
  const isUserRegistered = isUserUUIDRegistered(userUUID, users);
  const sanitized = sanitizeDisplayName(displayName);
  const isNotEmpty = isDisplayNameEmpty(sanitized) === false;
  const canEditUserProfile = isUserRegistered && isNotEmpty;
  if (canEditUserProfile) {
    sendUserProfileEditedEventToPond(pond, userUUID, sanitized);
  }
  return canEditUserProfile;
};

//#endregion
