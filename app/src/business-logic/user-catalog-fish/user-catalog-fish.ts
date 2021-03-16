/**
 * The UsersCatalogFish is responsible to provide users profile information in the system and relates to functionalities such sign up and sign in.
 */

import { UserCatalogFishEvent, UserCatalogFishState } from './types';
import { Fish, FishId } from '@actyx/pond';
import { reducer } from './reducer';
import { userCatalogTag } from '../tags/tags';

const initialState: UserCatalogFishState = {
  users: {},
  emails: {},
};

export const UserCatalogFish: Fish<
  UserCatalogFishState,
  UserCatalogFishEvent
> = {
  fishId: FishId.of('usersCatalog', 'usersCatalog', 0),
  initialState,
  onEvent: reducer,
  where: userCatalogTag,
};
