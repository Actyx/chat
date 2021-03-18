import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
  UserCatalogFishEventType,
  UserCatalogFishState,
} from './types';
import { Timestamp } from '@actyx/pond';
import { Reduce } from '@actyx/pond';
import { isUserUUIDRegistered } from './logic/helpers';

export const reducer: Reduce<UserCatalogFishState, UserCatalogFishEvent> = (
  state,
  event,
  meta
): UserCatalogFishState => {
  switch (event.type) {
    case UserCatalogFishEventType.UserAdded: {
      return userAdded(state, event, meta.timestampMicros);
    }
    case UserCatalogFishEventType.UserProfileEdited: {
      return userProfileEdited(state, event, meta.timestampMicros);
    }
    default:
      return state;
  }
};

const userAdded = (
  state: UserCatalogFishState,
  event: UserAddedEvent,
  timestampMicros: Timestamp
): UserCatalogFishState => {
  const {
    payload: { userUUID, displayName, email },
  } = event;
  const isRegistered = isUserUUIDRegistered(userUUID, state.users);
  if (!isRegistered) {
    state.users[userUUID] = {
      userUUID,
      createdOn: timestampMicros,
      displayName,
      email,
    };
    state.emails[email] = userUUID;
  }
  return state;
};

const userProfileEdited = (
  state: UserCatalogFishState,
  event: UserProfileEditedEvent,
  timestampMicros: Timestamp
): UserCatalogFishState => {
  const {
    payload: { userUUID, displayName },
  } = event;
  const isRegistered = isUserUUIDRegistered(userUUID, state.users);
  if (isRegistered === true) {
    state.users[userUUID].displayName = displayName;
    state.users[userUUID].editedOn = timestampMicros;
  }
  return state;
};
