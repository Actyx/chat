import { getUserAddedEvent, getUserProfileEditedEvent } from './events';
import {
  Email,
  UserCatalogFishEvent,
  Users,
  UsersCatalogFishState,
  UsersEmails,
  UserUUID,
} from './types';
import { v4 as uuid } from 'uuid';
import { Pond } from '@actyx/pond';
import { UsersCatalogFish } from './users-catalog-fish';
import { isStringEmpty, trimString } from '../../common/utility';
import { isUserSignedIn } from '../channel-fish/logic';

//#region Sign-up

export const signUp = (pond: Pond, makerUUID: () => UserUUID) => async (
  displayName: string,
  email: Email
): Promise<UserUUID | undefined> => {
  const userUUID = makerUUID();
  let isSuccess = false;
  await pond
    .run<UsersCatalogFishState, UserCatalogFishEvent>(
      UsersCatalogFish.fish,
      (fishState, enqueue) => {
        const canSignUp =
          isUserEmailRegistered(email, fishState.emails) === false;
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

export const getDisplayNameByUserUUID = (
  userUUID: UserUUID,
  users: Users
): string | undefined => {
  const isRegister = isUserUUIDRegistered(userUUID, users);
  if (isRegister) {
    return users[userUUID].displayName;
  } else {
    return undefined;
  }
};

export const editUserProfile = (pond: Pond) => async (
  signedInUserUUID: UserUUID,
  displayName: string
): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(signedInUserUUID)) {
    await pond
      .run(UsersCatalogFish.fish, (fishState, enqueue) => {
        const isUserRegistered = isUserUUIDRegistered(
          signedInUserUUID,
          fishState.users
        );
        const displayNameTrimmed = trimString(displayName);
        const isNameNotEmpty = isStringEmpty(displayNameTrimmed) === false;
        const canEditUserProfile = isUserRegistered && isNameNotEmpty;
        if (canEditUserProfile) {
          enqueue(...getUserProfileEditedEvent(signedInUserUUID, displayName));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

//#endregion
