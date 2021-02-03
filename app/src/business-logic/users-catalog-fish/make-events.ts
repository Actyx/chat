import {
  UserAddedEvent,
  UserProfileEditedEvent,
  UsersCatalogFishEventType,
  UserUniqueIdentifier,
} from './types';

export const mkUserAddedEvent = (
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string,
  email: string
): UserAddedEvent => ({
  type: UsersCatalogFishEventType.UserAdded,
  payload: {
    userUniqueIdentifier,
    displayName,
    email,
  },
});

export const mkUserProfileEditedEvent = (
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string
): UserProfileEditedEvent => ({
  type: UsersCatalogFishEventType.UserProfileEdited,
  payload: {
    userUniqueIdentifier,
    displayName,
  },
});
