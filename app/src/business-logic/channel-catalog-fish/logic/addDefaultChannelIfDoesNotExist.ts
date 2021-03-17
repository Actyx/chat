import { Pond } from '@actyx/pond';
import { DEFAULT_CHANNEL } from '../../channel-fish/channel-fish';
import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID, SYSTEM_USER } from '../../user-catalog-fish/types';
import { ChannelCatalogFish } from '../channel-catalog-fish';
import { getChannelAdded } from '../events';
import { isChannelIdRegistered } from '../logic-helpers';
import {
  AddDefaultChannelIfDoesNotExistLogicResult,
  ChannelCatalogFishState,
} from '../types';

export const addDefaultChannelIfDoesNotExistLogic = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID
): AddDefaultChannelIfDoesNotExistLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  const hasDefaultChannel = isChannelIdRegistered(
    DEFAULT_CHANNEL.channelId,
    fishState.channels
  );
  if (hasDefaultChannel) {
    return {
      type: 'error',
      code: ErrorCode.ChannelDefaultAlredyExist,
      message: 'Default channel already exist',
    };
  }

  return {
    type: 'ok',
    tagsWithEvents: [
      getChannelAdded(
        DEFAULT_CHANNEL.channelId,
        SYSTEM_USER,
        DEFAULT_CHANNEL.name
      ),
    ],
    result: undefined,
  };
};

export const addDefaultChannelIfDoesNotExist = (pond: Pond) => async (
  userUUID: UserUUID
): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run(ChannelCatalogFish, (fishState, enqueue) => {
        const canAddDefault = !isChannelIdRegistered(
          DEFAULT_CHANNEL.channelId,
          fishState.channels
        );
        if (canAddDefault) {
          enqueue(
            ...getChannelAdded(
              DEFAULT_CHANNEL.channelId,
              SYSTEM_USER,
              DEFAULT_CHANNEL.name
            )
          );
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};
