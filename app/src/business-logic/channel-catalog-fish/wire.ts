import { Pond } from '@actyx/pond';
import { UserUUID } from '../user-catalog-fish/types';
import { ChannelCatalogFish } from './channel-catalog-fish';
import { addChannelLogic } from './logic';
import { AddChannelLogicResult } from './types';

export const addChannelWire = (pond: Pond) => (userUUID: UserUUID) => async (
  name: string,
  description: string
): Promise<AddChannelLogicResult> =>
  new Promise(async (res, rej) => {
    try {
      await pond
        .run(ChannelCatalogFish, (fishState, enqueue) => {
          const result = addChannelLogic(userUUID)(fishState)(
            name,
            description
          );
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
