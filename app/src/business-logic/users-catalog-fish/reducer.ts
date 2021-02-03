import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
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
      return userProfileEdited(state, event, meta);
    }
  }
};

const userAdded = (
  state: UsersCatalogFishState,
  event: UserAddedEvent,
  meta: Metadata
): UsersCatalogFishState => {
  const {
    payload: { userUniqueIdentifier, displayName, email },
  } = event;
  console.debug(meta);
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

const userProfileEdited = (
  state: UsersCatalogFishState,
  event: UserProfileEditedEvent,
  meta: Metadata
): UsersCatalogFishState => {
  const {
    payload: { userUniqueIdentifier, displayName },
  } = event;
  const users = {
    ...state.users,
    [userUniqueIdentifier]: {
      ...state.users[userUniqueIdentifier],
      displayName,
      editedOn: meta.timestampMicros,
    },
  };
  return {
    ...state,
    users,
  };
};
