import { getUserAddedEvent, getUserProfileEditedEvent } from './events';
import {
  Email,
  UserCatalogFishEvent,
  Users,
  UserCatalogFishState,
  UsersEmails,
  UserUUID,
  SYSTEM_USER,
  ANONYMOUS_USER,
} from './types';
import { v4 as uuid } from 'uuid';
import { Pond } from '@actyx/pond';
import { UserCatalogFish } from './user-catalog-fish';
import { isStringEmpty, prepareString } from '../../common/strings';

//#region Others

export const isUserCreatedBySystem = (userUUID: UserUUID): boolean =>
  userUUID === SYSTEM_USER;

export const isSignedInUser = (userUUID: UserUUID) =>
  userUUID !== ANONYMOUS_USER;

export const getTotalUsers = (users: Users) => Object.values(users).length;

//#endregion

//#region Sign-up

export const signUp = (pond: Pond, makerUUID: () => UserUUID) => async (
  displayName: string,
  email: Email
): Promise<UserUUID | undefined> => {
  const userUUID = makerUUID();
  let isSuccess = false;
  await pond
    .run<UserCatalogFishState, UserCatalogFishEvent>(
      UserCatalogFish,
      (fishState, enqueue) => {
        const canSignUp = !isUserEmailRegistered(email, fishState.emails);
        if (canSignUp) {
          enqueue(...getUserAddedEvent(userUUID, displayName, email));
          isSuccess = true;
        }
      }
    )
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

export const editUserProfile = (pond: Pond) => async (
  userUUID: UserUUID,
  displayName: string
): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run(UserCatalogFish, (fishState, enqueue) => {
        const isUserRegistered = isUserUUIDRegistered(
          userUUID,
          fishState.users
        );
        const newDisplayName = prepareString(displayName);
        const isNameNotEmpty = !isStringEmpty(newDisplayName);
        const canEditUserProfile = isUserRegistered && isNameNotEmpty;
        if (canEditUserProfile) {
          enqueue(...getUserProfileEditedEvent(userUUID, displayName));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

//#endregion
