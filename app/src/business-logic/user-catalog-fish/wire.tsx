import { Pond } from '@actyx/pond';
import { signUpLogic } from './logic';
import {
  Email,
  UserCatalogFishEvent,
  UserCatalogFishState,
  UserUUID,
} from './types';
import { UserCatalogFish } from './user-catalog-fish';
import { SignUpResult } from '../common/types';

export const signUpWire = (pond: Pond, makerUUID: () => UserUUID) => async (
  displayName: string,
  email: Email
): Promise<SignUpResult> => {
  let resultOutput: SignUpResult;
  await pond
    .run<UserCatalogFishState, UserCatalogFishEvent>(
      UserCatalogFish,
      (fishState, enqueue) => {
        const result = signUpLogic(makerUUID, fishState)(displayName, email);
        if (result.status === 'ok') {
          enqueue(...result.tagsWithEvents[0]);
        }
        resultOutput = result;
      }
    )
    .toPromise();
  return resultOutput!;
};
