import { Timestamp } from '@actyx/pond';

//#region General

export type AnonymousUser = UserUUID;
export const ANONYMOUS_USER: AnonymousUser = 'anonymous-user';

export type UserUUID = string;

export const SYSTEM_USER: UserUUID = 'system-user';

export type Email = string;

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

export type UserProfile = {
  userUUID: UserUUID;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  displayName: string;
  email: Email;
};

export type UsersEmails = Record<Email, UserUUID>;
export type Users = Record<UserUUID, UserProfile>;

export type UserCatalogFishState = {
  users: Users;
  emails: UsersEmails;
};

//#endregion
