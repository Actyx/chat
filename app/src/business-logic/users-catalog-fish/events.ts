import { AddEmission, Tags } from '@actyx/pond';
import { TagsWithEvent } from '../../common/utility-types';
import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
  UsersCatalogFishEventType,
  UserUUID,
} from './types';
import { UsersCatalogFish } from './users-catalog-fish';

//#region Make events

export const getUserAddedEvent = (
  userUUID: UserUUID,
  displayName: string,
  email: string
): TagsWithEvent<UserCatalogFishEvent> => {
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
  return [tags, event];
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
