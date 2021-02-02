import { UserUniqueIdentifier } from '../common-types';
import { mkUserAddedEvent } from './make-events';
import { Email, UsersEmails } from './types';
import { v4 as uuid } from 'uuid';
import { UsersCatalogFish } from './users-catalog-fish';
import { Pond } from '@actyx/pond';

export const checkUserEmailRegisteredAndSignup = (
  pond: Pond,
  displayName: string,
  email: Email,
  usersEmails: UsersEmails
) =>
  isUserEmailRegistered(email, usersEmails) === false &&
  sendUserAddedEventToPond(pond, mkUserUniqueIdentifier(), displayName, email);

export const isUserEmailRegistered = (
  email: Email,
  usersEmails: UsersEmails
): boolean => {
  return email in usersEmails;
};

const sendUserAddedEventToPond = (
  pond: Pond,
  userUniqueIdentifier: UserUniqueIdentifier,
  displayName: string,
  email: string
) => {
  const tags = UsersCatalogFish.tags.user.and(
    UsersCatalogFish.tags.usersCatalog
  );
  const event = mkUserAddedEvent(userUniqueIdentifier, displayName, email);
  pond.emit(tags, event);
};

const mkUserUniqueIdentifier = (): UserUniqueIdentifier => uuid();
