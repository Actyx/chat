import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UsersCatalogFishEventType,
  UsersCatalogFishState,
} from './types';
import { Metadata } from '@actyx/pond';
import { Reduce, unreachableOrElse } from '@actyx/pond';

export const reducer: Reduce<UsersCatalogFishState, UserCatalogFishEvent> = (
  state,
  event,
  meta
) => {
  const { eventType } = event;
  switch (eventType) {
    case UsersCatalogFishEventType.UserAdded: {
      return userAdded(state, event as UserAddedEvent, meta);
    }
    case UsersCatalogFishEventType.UserProfileEdited: {
      return state;
    }
    default:
      return unreachableOrElse(eventType, state);
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
