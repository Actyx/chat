import { UserUniqueIdentifier } from '../common-types';
import { UserAddedEvent, UsersCatalogFishEventType } from './types';

export const mkUserAddedEvent = (
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string,
  email: string
): UserAddedEvent => ({
  eventType: UsersCatalogFishEventType.UserAdded,
  payload: {
    userUniqueIdentifier,
    displayName,
    email,
  },
});
