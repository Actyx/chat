import React, { useRef } from 'react';
import { ChannelId } from '../../../../../business-logic/message/types';
import { UserUUID } from '../../../../../business-logic/user-catalog-fish/types';
import { MessageUI } from '../Message/Message';
import { MessageListContainer } from './MessageListContainer';
import { useScrollIntoViewLatestMessage } from './useScrollIntoViewLatestMessage';

type MessageListProps = Readonly<{
  userUUID: UserUUID;
  activeChannelId: ChannelId;
  messages: ReadonlyArray<MessageUI>;
}>;

const Spacer = () => <div className="w-4 h-4" />;

export const MessageList = ({
  userUUID,
  activeChannelId,
  messages,
}: MessageListProps) => {
  const markerElm = useRef<HTMLDivElement>(null);

  useScrollIntoViewLatestMessage(userUUID, messages, markerElm.current);

  return (
    <>
      <Spacer />
      <MessageListContainer
        userUUID={userUUID}
        activeChannelId={activeChannelId}
        messages={messages}
      />
      <div ref={markerElm} />
    </>
  );
};
