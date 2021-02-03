import { Timestamp } from '@actyx/pond';

//#region General

export type UserUniqueIdentifier = string;

export type Email = string;

export type UserProfile = Readonly<{
  userUniqueIdentifier: UserUniqueIdentifier;
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
    userUniqueIdentifier: UserUniqueIdentifier;
    displayName: string;
    email: Email;
  };
};

export type UserProfileEditedEvent = {
  type: UsersCatalogFishEventType.UserProfileEdited;
  payload: {
    displayName: string;
  };
};

export type UserCatalogFishEvent = UserAddedEvent | UserProfileEditedEvent;

//#endregion

//#region State

export type UsersEmails = Record<Email, null>;
export type Users = Record<UserUniqueIdentifier, UserProfile>;

export type UsersCatalogFishState = Readonly<{
  users: Users;
  usersEmails: UsersEmails;
}>;

//#endregion
