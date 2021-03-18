import React, { useContext } from 'react';
import { Typography } from '../../../common/Typography/Typography';
import { UsersIcon } from '../../../common/Icons/UsersIcon';
import { UserIcon } from '../../../common/Icons/UserIcon';
import { MessageList } from './MessageList';
import { MessageUI } from './Message';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { CentralSection } from '../../../common/CentralSection/CentralSection';
import { MessageInputContainer } from './MessageInput/MessageInputContainer';

export type MessagesUI = ReadonlyArray<MessageUI>;

type ChannelProps = Readonly<{
  channelName: string;
  channelDescription?: string;
  messages: ReadonlyArray<MessageUI>;
  totalUsers: number;
}>;

export const Channel = ({
  channelName,
  channelDescription,
  messages,
  totalUsers,
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
            {channelDescription && (
              <Typography tag="div" size="sm" color="gray-medium">
                {channelDescription}
              </Typography>
            )}
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
      body={<MessageList key={stateUI.activeChannelId} messages={messages} />}
      footer={<MessageInputContainer channelName={channelName} />}
    />
  );
};
