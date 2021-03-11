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
import { v4 as uuid } from 'uuid';
import { isStringEmpty, prepareString } from '../../common/strings';
import { isUserUUIDRegistered } from './logic-helpers';
import { ErrorType } from '../common/logic-types';

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
      status: 'ok',
      tagsWithEvents: [getUserAddedEvent(userUUID, displayName, email)],
    };
  } else {
    return {
      status: 'error',
      errorType: ErrorType.SignUp_EmailAlreadyExists,
      errorMessage:
        'User cannot sign-up, his email is already registered in the system',
    };
  }
};

const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => email in usersEmails;

export const mkUserUUID = (): UserUUID => uuid();

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
    return {
      status: 'error',
      errorType: ErrorType.Authetication_UserIsNotSignedIn,
      errorMessage: 'User is not signed-in',
    };
  }

  if (!isUserRegistered) {
    return {
      status: 'error',
      errorType: ErrorType.UserEditProfile_UserIsNotRegistered,
      errorMessage: 'UserUUID is not registered',
    };
  }

  if (!hasDisplayName) {
    return {
      status: 'error',
      errorType: ErrorType.UserEditProfile_DisplayNameIsRequired,
      errorMessage: 'The displayName is required',
    };
  }

  return {
    status: 'ok',
    tagsWithEvents: [getUserProfileEditedEvent(userUUID, displayName)],
  };
};

//#endregion
