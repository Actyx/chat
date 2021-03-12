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
  new Promise((res, rej) => {
    let result: SignUpLogicResult;
    pond
      .run(UserCatalogFish, (fishState, enqueue) => {
        result = signUpLogic(makerUUID, fishState)(displayName, email);
        if (result.type === 'ok') {
          enqueue(...result.tagsWithEvents[0]);
        }
      })
      .toPromise()
      .then(() => res(result))
      .catch(rej);
  });

export const signUpWireForUI = signUpWire(mkUUID);

export const editUserProfileWire = (pond: Pond) => async (
  userUUID: UserUUID,
  displayName: string
): Promise<EditUserProfileResult> =>
  new Promise(async (res, rej) => {
    let result: EditUserProfileResult;
    pond
      .run(UserCatalogFish, (fishState, enqueue) => {
        const result = editUserProfileLogic(fishState, displayName, userUUID);
        if (result.type === 'ok') {
          enqueue(...result.tagsWithEvents[0]);
        }
      })
      .toPromise()
      .then(() => res(result))
      .catch(rej);
  });
