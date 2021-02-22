import { TagsWithEvent } from '../../common/types';
import {
  SYSTEM_USER,
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
  UserCatalogFishEventType,
  UserUUID,
} from './types';
import { UserCatalogFish } from './user-catalog-fish';

export const mkUserTagWithId = (userUUID: UserUUID) =>
  UserCatalogFish.tags.user.withId(userUUID);

export const mkUserCatelogOperationsTags = (userUUID: UserUUID) =>
  UserCatalogFish.tags.userCatalog.and(mkUserTagWithId(userUUID));

export const getUserAddedEvent = (
  userUUID: UserUUID,
  displayName: string,
  email: string
): TagsWithEvent<UserCatalogFishEvent> => {
  const event: UserAddedEvent = {
    type: UserCatalogFishEventType.UserAdded,
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
    type: UserCatalogFishEventType.UserProfileEdited,
    payload: {
      userUUID,
      displayName,
      editedBy: userUUID,
    },
  };
  const tags = UserCatalogFish.tags.userCatalog.and(mkUserTagWithId(userUUID));
  return [tags, event];
};
