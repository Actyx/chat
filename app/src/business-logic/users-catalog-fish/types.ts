import { Timestamp } from '@actyx/pond';
import { UserUniqueIdentifier } from '../common-types';

//#region General

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

export const enum UsersCatalogFishEventType {
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

export type UsersCatalogFishState = Readonly<{
  users: Record<UserUniqueIdentifier, UserProfile>;
  usersEmails: Record<Email, ''>;
}>;

//#endregion
