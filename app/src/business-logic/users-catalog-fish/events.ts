import { Pond } from '@actyx/pond';
import {
  UserAddedEvent,
  UserProfileEditedEvent,
  UsersCatalogFishEventType,
  UserUniqueIdentifier,
} from './types';
import { UsersCatalogFish } from './users-catalog-fish';

//#region Make events

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

//#endregion

//#region Send events to Pond

export const sendUserAddedEventToPond = (
  pond: Pond,
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string,
  email: string
): void => {
  const tags = UsersCatalogFish.tags.user
    .and(UsersCatalogFish.tags.usersCatalog)
    .and(UsersCatalogFish.tags.user.withId(userUniqueIdentifier));
  const event = mkUserAddedEvent(userUniqueIdentifier, displayName, email);
  pond.emit(tags, event);
};

export const sendUserProfileEditedEventToPond = (
  pond: Pond,
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string
): void => {
  const tags = UsersCatalogFish.tags.user.and(
    UsersCatalogFish.tags.user.withId(userUniqueIdentifier)
  );
  const event = mkUserProfileEditedEvent(userUniqueIdentifier, displayName);
  pond.emit(tags, event);
};

//#endregion
