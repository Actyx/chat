import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { ChannelId, MessageId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getMessageContentEdited } from '../events';
import { doesMessageBelongToUser, getMessageById } from '../logic';
import { ChannelFishState, EditMessageInChannelResult } from '../types';

export const editMessageInChannel = (
  fishState: ChannelFishState,
  channelId: ChannelId,
  userUUID: UserUUID,
  messageId: MessageId,
  content: string
): EditMessageInChannelResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  const message = getMessageById(messageId, fishState.messages);
  if (!message) {
    return {
      type: 'error',
      code: ErrorCode.ChannelDefaultAlredyExist, // CHANGE THIS
      message: `Cannot edit an not existing message (${messageId})`,
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
    tagsWithEvents: [
      getMessageContentEdited(messageId, channelId, content, userUUID),
    ],
    result: undefined,
  };
};
