/**
 * The UsersCatalogFish is responsible to provide users profile information in the system and relates to functionalities such sign-up and sign-in.
 */

import { UserCatalogFishEvent, UserCatalogFishState } from './types';
import { Fish, FishId, Tag } from '@actyx/pond';
import { reducer } from './reducer';

const tags = {
  userCatalog: Tag<UserCatalogFishEvent>('user-catalog'),
  user: Tag<UserCatalogFishEvent>('user'),
};

const initialState: UserCatalogFishState = {
  users: {},
  emails: {},
};

const fish: Fish<UserCatalogFishState, UserCatalogFishEvent> = {
  fishId: FishId.of('usersCatalog', 'usersCatalog', 0),
  initialState,
  onEvent: reducer,
  where: tags.userCatalog,
};

export const UserCatalogFish = {
  fish,
  tags,
};
