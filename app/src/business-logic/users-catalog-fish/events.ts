import { TagsWithEvent } from '../../common/types';
import {
  SYSTEM_USER,
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
  UsersCatalogFishEventType,
  UserUUID,
} from './types';
import { UsersCatalogFish } from './users-catalog-fish';

export const mkUserTagWithId = (userUUID: UserUUID) =>
  UsersCatalogFish.tags.user.withId(userUUID);

export const mkUserCatelogOperationsTags = (userUUID: UserUUID) =>
  UsersCatalogFish.tags.usersCatalog.and(mkUserTagWithId(userUUID));

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
      createdBy: SYSTEM_USER,
    },
  };
  const tags = mkUserCatelogOperationsTags(userUUID);

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
      editedBy: userUUID,
    },
  };
  const tags = UsersCatalogFish.tags.usersCatalog.and(
    mkUserTagWithId(userUUID)
  );
  return [tags, event];
};
