import { TagsWithEvent } from '../../common/types';
import { userCatalogTag, userTag } from '../tags/tags';
import {
  SYSTEM_USER,
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
  UserCatalogFishEventType,
  UserUUID,
} from './types';

export const mkUserTagWithId = (userUUID: UserUUID) => userTag.withId(userUUID);

export const mkUserCatelogOperationsTags = (userUUID: UserUUID) =>
  userCatalogTag.and(mkUserTagWithId(userUUID));

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
  const tags = userCatalogTag.and(mkUserTagWithId(userUUID));
  return [tags, event];
};
