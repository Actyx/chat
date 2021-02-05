import {
  sendUserAddedEventToPond,
  sendUserProfileEditedEventToPond,
} from './events';
import { Email, Users, UsersEmails, UserUniqueIdentifier } from './types';
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
  userUniqueIdentifier?: UserUniqueIdentifier;
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
): boolean => email in usersEmails;

const mkUserUniqueIdentifier = (): UserUniqueIdentifier => uuid();

//#endregion

//#region Sign-in

const isUserUniqueIdentifierRegistered = (
  userUniqueIdentifier: UserUniqueIdentifier,
  users: Users
): boolean => userUniqueIdentifier in users;

export const signIn = (
  userUniqueIdentifier: UserUniqueIdentifier,
  users: Users
): boolean => {
  const canSignIn = isUserUniqueIdentifierRegistered(
    userUniqueIdentifier,
    users
  );
  return canSignIn;
};

//#endregion

//#region User profile edit

const sanitizeDisplayName = (displayName: string) => displayName.trim();

const isDisplayNameEmpty = (displayName: string) => displayName.length === 0;

export const editUserProfile = (
  pond: Pond,
  users: Users,
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string
): Readonly<{ success: boolean; sanitizedDisplayName?: string }> => {
  const isUserRegistered = isUserUniqueIdentifierRegistered(
    userUniqueIdentifier,
    users
  );
  const sanitized = sanitizeDisplayName(displayName);
  const isNotEmpty = isDisplayNameEmpty(sanitized) === false;
  const canEditUserProfile = isUserRegistered && isNotEmpty;
  if (canEditUserProfile) {
    sendUserProfileEditedEventToPond(pond, userUniqueIdentifier, sanitized);
  }
  return {
    success: canEditUserProfile,
    sanitizedDisplayName: canEditUserProfile ? sanitized : undefined,
  };
};

//#endregion
