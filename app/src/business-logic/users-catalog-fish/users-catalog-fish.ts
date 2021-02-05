import { UserCatalogFishEvent, UsersCatalogFishState } from './types';
import { Fish, FishId, Tag } from '@actyx/pond';
import { reducer } from './reducer';

const tags = {
  usersCatalog: Tag<UserCatalogFishEvent>('users-catalog'),
  user: Tag<UserCatalogFishEvent>('user'),
};

const initialState: UsersCatalogFishState = {
  users: {},
  emails: {},
};

const fish: Fish<UsersCatalogFishState, UserCatalogFishEvent> = {
  fishId: FishId.of('com.chat.usersCatalog', 'usersCatalog', 0),
  initialState,
  onEvent: reducer,
  where: tags.usersCatalog.or(tags.user),
};

export const UsersCatalogFish = {
  fish,
  tags,
};
