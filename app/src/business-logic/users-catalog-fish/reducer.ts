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
    payload: { userUUID, displayName, email },
  } = event;
  console.debug(meta);
  const users = {
    ...state.users,
    [userUUID]: {
      userUUID,
      createdOn: meta.timestampMicros,
      displayName,
      email,
    },
  };
  const emails = {
    ...state.emails,
    [email]: null,
  };

  return {
    users,
    emails,
  };
};

const userProfileEdited = (
  state: UsersCatalogFishState,
  event: UserProfileEditedEvent,
  meta: Metadata
): UsersCatalogFishState => {
  const {
    payload: { userUUID, displayName },
  } = event;
  const users = {
    ...state.users,
    [userUUID]: {
      ...state.users[userUUID],
      displayName,
      editedOn: meta.timestampMicros,
    },
  };
  return {
    ...state,
    users,
  };
};
