import { Timestamp } from '@actyx/pond';
import { LogicResult, LogicResultUI } from '../common/logic-types';

//#region General

export type AnonymousUser = UserUUID;
export const ANONYMOUS_USER: AnonymousUser = 'anonymous-user';

export type UserUUID = string;

export const SYSTEM_USER: UserUUID = 'system-user';

export type Email = string;

export type UserProfile = {
  userUUID: UserUUID;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  displayName: string;
  email: Email;
};

//#endregion

//#region Events

export enum UserCatalogFishEventType {
  UserAdded = 'UserAdded',
  UserProfileEdited = 'UserProfileEdited',
}

export type UserAddedEvent = {
  type: UserCatalogFishEventType.UserAdded;
  payload: {
    userUUID: UserUUID;
    createdBy: UserUUID;
    displayName: string;
    email: Email;
  };
};

export type UserProfileEditedEvent = {
  type: UserCatalogFishEventType.UserProfileEdited;
  payload: {
    userUUID: UserUUID;
    editedBy: UserUUID;
    displayName: string;
  };
};

export type UserCatalogFishEvent = UserAddedEvent | UserProfileEditedEvent;

//#endregion

//#region State

export type UsersEmails = Record<Email, UserUUID>;
export type Users = Record<UserUUID, UserProfile>;

export type UserCatalogFishState = {
  users: Users;
  emails: UsersEmails;
};

//#endregion

//#region Logic

export type SignUpLogicResult = LogicResult<UserCatalogFishEvent, UserUUID>;

export type SignUpLogicResultUI = LogicResultUI<UserUUID>;

export type EditUserProfileResult = LogicResult<UserCatalogFishEvent, void>;

export type EditUserProfileResultUI = LogicResultUI<void>;

//#endregion
