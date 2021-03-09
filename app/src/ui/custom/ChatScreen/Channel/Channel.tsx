import React, { useContext, useState } from 'react';
import { MessageId } from '../../../../business-logic/message/types';
import { Typography } from '../../../common/Typography/Typography';
import { MessageInput } from './MessageInput';
import { UsersIcon } from '../../../common/Icons/UsersIcon';
import { UserIcon } from '../../../common/Icons/UserIcon';
import { MessageList } from './MessageList';
import { MessageUI } from './Message';
import { StateContextUI } from '../../../ui-state-manager/UIStateManager';
import { CentralSection } from '../../../common/CentralSection/CentralSection';
import { Alert } from '../../../common/Alert/Alert';

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

const CONFIRM_HIDE_MESSAGE = 'Are you sure to hide this message?';

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

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleAddMessage = async (content: string) => {
    try {
      await addMessage(content);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleEditMessage = async (messageId: MessageId, content: string) => {
    try {
      await editMessage(messageId, content);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleHideMessage = async (messageId: MessageId) => {
    const hasUserConfirmed = window.confirm(CONFIRM_HIDE_MESSAGE);
    if (hasUserConfirmed) {
      try {
        await hideMessage(messageId);
      } catch (err) {
        setPondErrorMessage(err);
      }
    }
  };

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
          editMessage={handleEditMessage}
          hideMessage={handleHideMessage}
        />
      }
      footer={
        <>
          {pondErrorMessage && (
            <div className="p-4">
              <Alert variant="danger">{pondErrorMessage}</Alert>
            </div>
          )}
          <MessageInput
            channelName={channelName}
            addMessage={handleAddMessage}
          />
        </>
      }
    />
  );
};
