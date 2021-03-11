import { Pond } from '@actyx/pond';
import { signUpLogic } from './logic';
import {
  Email,
  SignUpLogicResult,
  UserCatalogFishEvent,
  UserCatalogFishState,
  UserUUID,
} from './types';
import { UserCatalogFish } from './user-catalog-fish';

export const signUpWire = (pond: Pond, makerUUID: () => UserUUID) => async (
  displayName: string,
  email: Email
): Promise<SignUpLogicResult> => {
  let resultOutput: SignUpLogicResult;
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
