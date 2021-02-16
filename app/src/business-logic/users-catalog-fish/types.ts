import { Timestamp } from '@actyx/pond';

//#region General

export type AnonymousUser = UserUUID;
export const ANONYMOUSE_USER: AnonymousUser = 'anonymous-user';

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

export enum UsersCatalogFishEventType {
  UserAdded = 'userAdded',
  UserProfileEdited = 'userProfileEdited',
}

export type UserAddedEvent = {
  type: UsersCatalogFishEventType.UserAdded;
  payload: {
    userUUID: UserUUID;
    createdBy: UserUUID;
    displayName: string;
    email: Email;
  };
};

export type UserProfileEditedEvent = {
  type: UsersCatalogFishEventType.UserProfileEdited;
  payload: {
    userUUID: UserUUID;
    editedBy: UserUUID;
    displayName: string;
  };
};

export type UserCatalogFishEvent = UserAddedEvent | UserProfileEditedEvent;

//#endregion

//#region State

export type UsersEmails = Record<Email, null>;
export type Users = Record<UserUUID, UserProfile>;

export type UsersCatalogFishState = {
  users: Users;
  emails: UsersEmails;
};

//#endregion
