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
  UserCatalogFishEvent,
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

export const signUpLogic = (
  makerUUID: () => UserUUID,
  fishState: UserCatalogFishState
) => (displayName: string, email: Email): SignUpLogicResult => {
  const userUUID = makerUUID();
  const canSignUp = !isUserEmailRegistered(email, fishState.emails);
  if (canSignUp) {
    return {
      type: 'ok',
      tagsWithEvents: [getUserAddedEvent(userUUID, displayName, email)],
    };
  } else {
    return {
      type: 'error',
      code: ErrorCode.SignUpEmailAlreadyExists,
      message:
        'User cannot sign-up, his email is already registered in the system',
    };
  }
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
  fishState: UserCatalogFishState,
  displayName: string,
  userUUID: UserUUID
): EditUserProfileResult => {
  const isUserSignIn = isSignedInUser(userUUID);
  const isUserRegistered = isUserUUIDRegistered(userUUID, fishState.users);
  const newDisplayName = prepareString(displayName);
  const hasDisplayName = !isStringEmpty(newDisplayName);

  if (!isUserSignIn) {
    return mkErrorAutheticationUserIsNotSignIn<UserCatalogFishEvent>();
  }

  if (!isUserRegistered) {
    const code = ErrorCode.UserEditProfileUserIsNotRegistered;
    logBugBl(code);
    return {
      type: 'error',
      code,
      message: 'UserUUID is not registered',
    };
  }

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
  };
};

//#endregion
