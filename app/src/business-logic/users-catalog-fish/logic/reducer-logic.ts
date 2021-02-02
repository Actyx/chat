import { UserAddedEvent, UsersCatalogFishState } from '../types';
import { Metadata } from '@actyx/pond';

export const reducerLogicUserAddedEvent = (
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
