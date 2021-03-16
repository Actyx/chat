import { Pond } from '@actyx/pond';
import { editUserProfileLogic } from './logic';
import {
  EditUserProfileResult,
  EditUserProfileResultUI,
  UserUUID,
} from './types';
import { UserCatalogFish } from './user-catalog-fish';

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
