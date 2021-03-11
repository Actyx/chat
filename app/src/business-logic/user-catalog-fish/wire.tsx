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
): Promise<SignUpLogicResult> =>
  new Promise(async (res, rej) => {
    try {
      await pond
        .run<UserCatalogFishState, UserCatalogFishEvent>(
          UserCatalogFish,
          (fishState, enqueue) => {
            const result = signUpLogic(makerUUID, fishState)(
              displayName,
              email
            );
            if (result.status === 'ok') {
              enqueue(...result.tagsWithEvents[0]);
            }
            res(result);
          }
        )
        .toPromise();
    } catch (err) {
      rej(err);
    }
  });
