import { Pond } from '@actyx/pond';
import { mkUUID } from '../common/util';
import { ChannelId } from '../message/types';
import { UserUUID } from '../user-catalog-fish/types';
import { ChannelCatalogFish } from './channel-catalog-fish';
import { addChannelLogic } from './logic';
import { AddChannelLogicResult } from './types';

const addChannelWire = (makerUUID: () => ChannelId) => (pond: Pond) => (
  userUUID: UserUUID
) => async (
  name: string,
  description: string
): Promise<AddChannelLogicResult> =>
  new Promise(async (res, rej) => {
    try {
      await pond
        .run(ChannelCatalogFish, (fishState, enqueue) => {
          const result = addChannelLogic(makerUUID)(fishState)(userUUID)(
            name,
            description
          );
          if (result.type === 'ok') {
            enqueue(...result.tagsWithEvents[0]);
          }
          res(result);
        })
        .toPromise();
    } catch (err) {
      rej(err);
    }
  });

export const addChannelWireForUi = addChannelWire(mkUUID);
