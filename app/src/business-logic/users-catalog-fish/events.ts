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

export const getUserProfileEditedEvent = (
  userUUID: UserUUID,
  displayName: string
): TagsWithEvent<UserCatalogFishEvent> => {
  const event: UserProfileEditedEvent = {
    type: UsersCatalogFishEventType.UserProfileEdited,
    payload: {
      userUUID,
      displayName,
    },
  };
  const tags = UsersCatalogFish.tags.user.withId(userUUID);
  return [tags, event];
};

//#endregion
