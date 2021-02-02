import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UsersCatalogFishEventType,
  UsersCatalogFishState,
} from './types';
import { Fish, FishId, Reduce, unreachableOrElse, Tag } from '@actyx/pond';
import { reducerLogicUserAddedEvent } from './logic/reducer-logic';

const tags = {
  usersCatalog: Tag<UserCatalogFishEvent>('users-catalog'),
  user: Tag<UserCatalogFishEvent>('user'),
};

const initialState: UsersCatalogFishState = {
  users: {},
  usersEmails: {},
};

const reducer: Reduce<UsersCatalogFishState, UserCatalogFishEvent> = (
  state,
  event,
  meta
) => {
  const { type } = event;
  switch (type) {
    case UsersCatalogFishEventType.UserAdded: {
      return reducerLogicUserAddedEvent(state, event as UserAddedEvent, meta);
    }
    case UsersCatalogFishEventType.UserProfileEdited: {
      return state;
    }
    default:
      return unreachableOrElse(type, state);
  }
};

const fish: Fish<UsersCatalogFishState, UserCatalogFishEvent> = {
  fishId: FishId.of('com.chat.usersCatalog', 'usersCatalog', 0),
  initialState,
  onEvent: reducer,
  where: tags.usersCatalog,
};

export const UsersCatalogFish = {
  fish,
  tags,
};
