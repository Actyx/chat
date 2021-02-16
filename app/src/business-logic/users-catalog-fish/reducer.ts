import {
  UserAddedEvent,
  UserCatalogFishEvent,
  UserProfileEditedEvent,
  UsersCatalogFishEventType,
  UsersCatalogFishState,
} from './types';
import { Timestamp } from '@actyx/pond';
import { Reduce } from '@actyx/pond';
import { isUserUUIDRegistered } from './logic';

export const reducer: Reduce<UsersCatalogFishState, UserCatalogFishEvent> = (
  state,
  event,
  meta
): UsersCatalogFishState => {
  console.log(event, meta);
  switch (event.type) {
    case UsersCatalogFishEventType.UserAdded: {
      return userAdded(state, event, meta.timestampMicros);
    }
    case UsersCatalogFishEventType.UserProfileEdited: {
      return userProfileEdited(state, event, meta.timestampMicros);
    }
    default:
      return state;
  }
};

const userAdded = (
  state: UsersCatalogFishState,
  event: UserAddedEvent,
  timestampMicros: Timestamp
): UsersCatalogFishState => {
  const {
    payload: { userUUID, displayName, email },
  } = event;
  const isRegistered = isUserUUIDRegistered(userUUID, state.users);
  if (isRegistered === false) {
    state.users[userUUID] = {
      userUUID,
      createdOn: timestampMicros,
      displayName,
      email,
    };
    state.emails[email] = null;
  }
  return state;
};

const userProfileEdited = (
  state: UsersCatalogFishState,
  event: UserProfileEditedEvent,
  timestampMicros: Timestamp
): UsersCatalogFishState => {
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
