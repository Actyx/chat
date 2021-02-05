import { Timestamp } from '@actyx/pond';

//#region General

export type UserUUID = string;

export type Email = string;

export type UserProfile = Readonly<{
  userUUID: UserUUID;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  displayName: string;
  email: Email;
}>;

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
    displayName: string;
    email: Email;
  };
};

export type UserProfileEditedEvent = {
  type: UsersCatalogFishEventType.UserProfileEdited;
  payload: {
    userUUID: UserUUID;
    displayName: string;
  };
};

export type UserCatalogFishEvent = UserAddedEvent | UserProfileEditedEvent;

//#endregion

//#region State

export type UsersEmails = Record<Email, null>;
export type Users = Record<UserUUID, UserProfile>;

export type UsersCatalogFishState = Readonly<{
  users: Users;
  emails: UsersEmails;
}>;

//#endregion
