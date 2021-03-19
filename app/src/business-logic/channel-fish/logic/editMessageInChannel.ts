import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorMessageDoesNotExist,
  mkErrorMessageUserIsNotOwner,
} from '../../common/errors';
import { ChannelId, MessageId, PublicMessageEvent } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getMessageContentEdited } from '../events';
import { doesMessageBelongToUser, getMessageById } from './logic-helpers';
import { ChannelFishState } from '../types';
import { LogicResult } from '../../common/logic-types';

export const editMessageInChannel = (
  fishState: ChannelFishState,
  users: Users,
  channelId: ChannelId,
  userUUID: UserUUID,
  messageId: MessageId,
  content: string
): LogicResult<PublicMessageEvent> => {
  if (!isSignedInUser(userUUID, users)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  const message = getMessageById(messageId, fishState.messages);
  if (!message) {
    return mkErrorMessageDoesNotExist(messageId);
  }

  if (!doesMessageBelongToUser(userUUID, message)) {
    return mkErrorMessageUserIsNotOwner(messageId, userUUID);
  }

  return {
    type: 'ok',
    tagsWithEvents: [
      getMessageContentEdited(messageId, channelId, content, userUUID),
    ],
    result: undefined,
  };
};
