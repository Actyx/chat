import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { ChannelId, MessageId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getMessageHiddenEvent } from '../events';
import { getMessageById, doesMessageBelongToUser } from '../logic';
import { ChannelFishState, HideMessageFromChannelResult } from '../types';

export const hideMessageFromChannelLogic = (
  fishState: ChannelFishState,
  channelId: ChannelId,
  userUUID: UserUUID,
  messageId: MessageId
): HideMessageFromChannelResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  const message = getMessageById(messageId, fishState.messages);
  if (!message) {
    return {
      type: 'error',
      code: ErrorCode.ChannelDefaultAlredyExist, // CHANGE THIS
      message: `Cannot edit a not existing message (${messageId})`,
    };
  }
  if (!doesMessageBelongToUser(userUUID, message)) {
    return {
      type: 'error',
      code: ErrorCode.ChannelDefaultAlredyExist, // CHANGE THIS
      message: `Cannot edit has the message (${messageId}) does not belong to the user (${userUUID}) `,
    };
  }
  return {
    type: 'ok',
    tagsWithEvents: [getMessageHiddenEvent(messageId, channelId, userUUID)],
    result: undefined,
  };
};
