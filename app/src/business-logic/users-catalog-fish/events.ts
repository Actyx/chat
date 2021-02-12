import { AddEmission, Tags } from '@actyx/pond';
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
  const tags: Tags<UserCatalogFishEvent> = UsersCatalogFish.tags.usersCatalog.and(
    UsersCatalogFish.tags.user.withId(userUUID)
  );
  enqueue(tags, event);
};

export const emitUserProfileEditedEvent = (
  enqueue: AddEmission<UserCatalogFishEvent>
) => (userUUID: UserUUID, displayName: string) => {
  const event: UserProfileEditedEvent = {
    type: UsersCatalogFishEventType.UserProfileEdited,
    payload: {
      userUUID,
      displayName,
    },
  };
  const tags: Tags<UserCatalogFishEvent> = UsersCatalogFish.tags.user.withId(
    userUUID
  );
  enqueue(tags, event);
};

//#endregion
