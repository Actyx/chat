import {
  UserCatalogFishEvent,
  UsersCatalogFishEventType,
  UsersCatalogFishState,
} from './types';
import { Fish, FishId, Reduce, unreachableOrElse, Tag } from '@actyx/pond';

const tags = {
  usersCatalog: Tag<UserCatalogFishEvent>('users-catalog'),
  user: Tag<UserCatalogFishEvent>('user'),
};

const initialState: UsersCatalogFishState = {
  users: {},
  usersEmails: {},
};

const usersCatalogOnEvent: Reduce<
  UsersCatalogFishState,
  UserCatalogFishEvent
> = (state, event, meta) => {
  const { type } = event;
  switch (type) {
    case UsersCatalogFishEventType.UserAdded: {
      return state;
    }
    case UsersCatalogFishEventType.UserProfileEdited: {
      return state;
    }
    default:
      return unreachableOrElse(type, state);
  }
};

export const UsersCatalogFish: Fish<
  UsersCatalogFishState,
  UserCatalogFishEvent
> = {
  fishId: FishId.of('com.chat.usersCatalog', 'usersCatalog', 0),
  initialState,
  onEvent: usersCatalogOnEvent,
  where: tags.usersCatalog,
};
