import React, { useContext } from 'react';
import { MessageId } from '../../../../business-logic/message/types';
import { Typography } from '../../../common/Typography/Typography';
import { MessageInput } from './MessageInput';
import { UsersIcon } from '../../../common/Icons/UsersIcon';
import { UserIcon } from '../../../common/Icons/UserIcon';
import { MessageList } from './MessageList';
import { MessageUI } from './Message';
import { StateContextUI } from '../../../ui-state-manager/UIStateManager';
import { CentralSection } from '../../../common/CentralSection/CentralSection';

export type MessagesUI = ReadonlyArray<MessageUI>;

type ChannelProps = Readonly<{
  channelName: string;
  channelDescription: string;
  messages: ReadonlyArray<MessageUI>;
  totalUsers: number;
  editMessage: (messageId: MessageId, content: string) => void;
  hideMessage: (messageId: MessageId) => void;
  addMessage: (content: string) => void;
}>;

export const Channel = ({
  channelName,
  channelDescription,
  messages,
  totalUsers,
  editMessage,
  hideMessage,
  addMessage,
}: ChannelProps) => {
  const stateUI = useContext(StateContextUI);
  return (
    <CentralSection
      header={
        <>
          <div>
            <Typography tag="div" weight="bold" color="gray-dark">
              #{channelName}
            </Typography>
            <Typography tag="div" size="sm" color="gray-medium">
              {channelDescription}
            </Typography>
          </div>
          <div className="flex space-x-2">
            <Typography tag="div" size="sm" color="gray-medium">
              {totalUsers}{' '}
            </Typography>
            {totalUsers !== 1 ? (
              <UsersIcon color="gray-medium" />
            ) : (
              <UserIcon color="gray-medium" />
            )}
          </div>
        </>
      }
      body={
        <MessageList
          key={stateUI.activeChannelId}
          messages={messages}
          editMessage={editMessage}
          hideMessage={hideMessage}
        />
      }
      footer={
        <MessageInput channelName={channelName} addMessage={addMessage} />
      }
    />
  );
};