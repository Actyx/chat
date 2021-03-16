import { getUserAddedEvent, getUserProfileEditedEvent } from './events';
import {
  Email,
  Users,
  UserCatalogFishState,
  UsersEmails,
  UserUUID,
  SYSTEM_USER,
  ANONYMOUS_USER,
  SignUpLogicResult,
  EditUserProfileResult,
} from './types';
import { isStringEmpty, prepareString } from '../../common/strings';
import { isUserUUIDRegistered } from './logic-helpers';
import { ErrorCode } from '../common/logic-types';
import { logBugBl } from '../../logger/logger';
import { mkErrorAutheticationUserIsNotSignIn } from '../common/errors';

//#region Others

export const isUserCreatedBySystem = (userUUID: UserUUID): boolean =>
  userUUID === SYSTEM_USER;

export const isSignedInUser = (userUUID: UserUUID) =>
  userUUID !== ANONYMOUS_USER;

export const getTotalUsers = (users: Users) => Object.values(users).length;

//#endregion

//#region Sign-up

export const signUpLogic = (makerUUID: () => UserUUID) => (
  fishState: UserCatalogFishState,
  displayName: string,
  email: Email
): SignUpLogicResult => {
  const userUUID = makerUUID();
  return isUserEmailRegistered(email, fishState.emails)
    ? {
        type: 'error',
        code: ErrorCode.SignUpEmailAlreadyExists,
        message:
          'User cannot sign-up, his email is already registered in the system',
      }
    : {
        type: 'ok',
        tagsWithEvents: [getUserAddedEvent(userUUID, displayName, email)],
        result: userUUID,
      };
};

const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => email in usersEmails;

//#endregion

//#region Sign-in

export const signIn = (userUUID: UserUUID, users: Users): boolean => {
  const canSignIn = isUserUUIDRegistered(userUUID, users);
  return canSignIn;
};

//#endregion

//#region User profile edit

export const editUserProfileLogic = (
  displayName: string,
  userUUID: UserUUID
) => (fishState: UserCatalogFishState): EditUserProfileResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isUserUUIDRegistered(userUUID, fishState.users)) {
    const code = ErrorCode.UserEditProfileUserIsNotRegistered;
    logBugBl(code);
    return {
      type: 'error',
      code,
      message: 'UserUUID is not registered',
    };
  }

  const newDisplayName = prepareString(displayName);
  const hasDisplayName = !isStringEmpty(newDisplayName);

  if (!hasDisplayName) {
    return {
      type: 'error',
      code: ErrorCode.UserEditProfileDisplayNameIsRequired,
      message: 'The displayName is required',
    };
  }

  return {
    type: 'ok',
    tagsWithEvents: [getUserProfileEditedEvent(userUUID, displayName)],
    result: undefined,
  };
};

//#endregion
