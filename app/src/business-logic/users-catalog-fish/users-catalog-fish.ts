/**
 * The UsersCatalogFish is responsible to provide users profile information in the system and relates to functionalities such sign-up and sign-in.
 */

import { UserCatalogFishEvent, UsersCatalogFishState } from './types';
import { Fish, FishId, Tag } from '@actyx/pond';
import { reducer } from './reducer';

const tags = {
  usersCatalog: Tag<UserCatalogFishEvent>('users-catalog'),
  user: Tag<UserCatalogFishEvent>('user'),
};

export const initialState: UsersCatalogFishState = {
  users: {},
  emails: {},
};

export const initialStateUserCatalogFish = initialState;

const fish: Fish<UsersCatalogFishState, UserCatalogFishEvent> = {
  fishId: FishId.of('usersCatalog', 'usersCatalog', 0),
  initialState,
  onEvent: reducer,
  where: tags.usersCatalog,
};

export const UsersCatalogFish = {
  fish,
  tags,
};
