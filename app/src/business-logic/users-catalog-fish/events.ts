import { Pond } from '@actyx/pond';
import {
  UserAddedEvent,
  UserProfileEditedEvent,
  UsersCatalogFishEventType,
  UserUUID,
} from './types';
import { UsersCatalogFish } from './users-catalog-fish';

//#region Make events

export const mkUserAddedEvent = (
  userUUID: UserUUID,
  displayName: string,
  email: string
): UserAddedEvent => ({
  type: UsersCatalogFishEventType.UserAdded,
  payload: {
    userUUID,
    displayName,
    email,
  },
});

export const mkUserProfileEditedEvent = (
  userUUID: UserUUID,
  displayName: string
): UserProfileEditedEvent => ({
  type: UsersCatalogFishEventType.UserProfileEdited,
  payload: {
    userUUID,
    displayName,
  },
});

//#endregion

//#region Send events to Pond

export const sendUserAddedEventToPond = (
  pond: Pond,
  userUUID: UserUUID,
  displayName: string,
  email: string
): void => {
  const tags = UsersCatalogFish.tags.user
    .and(UsersCatalogFish.tags.usersCatalog)
    .and(UsersCatalogFish.tags.user.withId(userUUID));
  const event = mkUserAddedEvent(userUUID, displayName, email);
  pond.emit(tags, event);
};

export const sendUserProfileEditedEventToPond = (
  pond: Pond,
  userUUID: UserUUID,
  displayName: string
): void => {
  const tags = UsersCatalogFish.tags.user.withId(userUUID);
  const event = mkUserProfileEditedEvent(userUUID, displayName);
  pond.emit(tags, event);
};

//#endregion
