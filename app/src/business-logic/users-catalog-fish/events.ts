import { AddEmission } from '@actyx/pond';
import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
  UsersCatalogFishEventType,
  UserUUID,
} from './types';
import { UsersCatalogFish } from './users-catalog-fish';

//#region Make events

export const emitUserAddedEvent = (
  enqueue: AddEmission<UserCatalogFishEvent>
) => (userUUID: UserUUID, displayName: string, email: string) => {
  const event: UserAddedEvent = {
    type: UsersCatalogFishEventType.UserAdded,
    payload: {
      userUUID,
      displayName,
      email,
    },
  };
  const tags = UsersCatalogFish.tags.usersCatalog.and(
    UsersCatalogFish.tags.user.withId(userUUID)
  );
  enqueue(tags, event);
};

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

export const mkUserAddedEventTags = (userUUID: UserUUID) => {
  const tags = UsersCatalogFish.tags.usersCatalog.and(
    UsersCatalogFish.tags.user.withId(userUUID)
  );
  return tags;
};

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

export const mkUserProfileEditedEventTags = (userUUID: UserUUID) =>
  UsersCatalogFish.tags.user.withId(userUUID);

//#endregion
