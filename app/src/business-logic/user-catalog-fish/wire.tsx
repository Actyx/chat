import { Pond } from '@actyx/pond';
import { editUserProfileLogic, signUpLogic } from './logic';
import {
  EditUserProfileResult,
  Email,
  SignUpLogicResult,
  UserUUID,
} from './types';
import { UserCatalogFish } from './user-catalog-fish';
import { mkUUID } from '../common/util';

const signUpWire = (makerUUID: () => UserUUID) => (pond: Pond) => async (
  displayName: string,
  email: Email
): Promise<SignUpLogicResult> =>
  new Promise(async (res, rej) => {
    try {
      await pond
        .run(UserCatalogFish, (fishState, enqueue) => {
          const result = signUpLogic(makerUUID, fishState)(displayName, email);
          if (result.status === 'ok') {
            enqueue(...result.tagsWithEvents[0]);
          }
          res(result);
        })
        .toPromise();
    } catch (err) {
      rej(err);
    }
  });

export const signUpWireForUI = signUpWire(mkUUID);

export const editUserProfileWire = (pond: Pond) => async (
  userUUID: UserUUID,
  displayName: string
): Promise<EditUserProfileResult> =>
  new Promise(async (res, rej) => {
    try {
      await pond
        .run(UserCatalogFish, (fishState, enqueue) => {
          const result = editUserProfileLogic(fishState, displayName, userUUID);
          if (result.status === 'ok') {
            enqueue(...result.tagsWithEvents[0]);
          }
          res(result);
        })
        .toPromise();
    } catch (err) {
      rej(err);
    }
  });
