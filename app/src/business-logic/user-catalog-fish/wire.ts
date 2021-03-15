import { Pond } from '@actyx/pond';
import { editUserProfileLogic, signUpLogic } from './logic';
import {
  EditUserProfileResult,
  EditUserProfileResultUI,
  Email,
  SignUpLogicResultUI,
  UserCatalogFishEvent,
  UserCatalogFishState,
  UserUUID,
} from './types';
import { UserCatalogFish } from './user-catalog-fish';
import { wire } from '../common/logic-helpers';

export const signUpWire = (makerUUID: () => UserUUID) => (pond: Pond) => async (
  displayName: string,
  email: Email
): Promise<SignUpLogicResultUI> =>
  wire<UserCatalogFishState, UserCatalogFishEvent, UserUUID>(
    pond,
    UserCatalogFish,
    signUpLogic(makerUUID)(displayName, email)
  );

// FIXME use the final wire function
export const editUserProfileWire = (pond: Pond) => async (
  userUUID: UserUUID,
  displayName: string
): Promise<EditUserProfileResultUI> => {
  let logicResult: EditUserProfileResult;
  return pond
    .run(UserCatalogFish, (fishState, enqueue) => {
      logicResult = editUserProfileLogic(fishState, displayName, userUUID);
      if (logicResult.type === 'ok') {
        logicResult.tagsWithEvents.forEach((x) => enqueue(...x));
      }
    })
    .toPromise()
    .then(() =>
      logicResult.type === 'ok'
        ? { type: 'ok', result: logicResult.result }
        : logicResult
    );
};
