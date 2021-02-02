import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UsersCatalogFishEventType,
  UsersCatalogFishState,
} from './types';
import { Metadata } from '@actyx/pond';
import { Reduce } from '@actyx/pond';

export const reducer: Reduce<UsersCatalogFishState, UserCatalogFishEvent> = (
  state,
  event,
  meta
): UsersCatalogFishState => {
  switch (event.type) {
    case UsersCatalogFishEventType.UserAdded: {
      return userAdded(state, event, meta);
    }
    case UsersCatalogFishEventType.UserProfileEdited: {
      return state;
    }
  }
};

export const userAdded = (
  state: UsersCatalogFishState,
  event: UserAddedEvent,
  meta: Metadata
): UsersCatalogFishState => {
  const {
    payload: { userUniqueIdentifier, displayName, email },
  } = event;
  const users = {
    ...state.users,
    [userUniqueIdentifier]: {
      userUniqueIdentifier,
      createdOn: meta.timestampMicros,
      displayName,
      email,
    },
  };
  const usersEmails = {
    ...state.usersEmails,
    [email]: null,
  };

  return {
    users,
    usersEmails,
  };
};
