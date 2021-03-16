import React, { ReactNode, useContext, useState } from 'react';
import { Dialogs, SectionCenter } from '../../../state-manager/types';
import { TopBar } from '../TopBar';
import { Channel } from '../Channel/Channel';
import {
  ChannelsCatalog,
  ChannelsOverviewUI,
} from '../ChannelsCatalog/ChannelsCatalog';
import { MessageUI } from '../Channel/Message';
import { ChannelId } from '../../../../business-logic/message/types';
import './chat.css';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { ErrorBoundary } from '../../../common/ErrorBoundary/ErrorBoundary';
import { UserProfileDetailsContainer } from '../../UserProfileDetails/UserProfileDetailsContainer';
import { AddChannelDialogContainer } from '../AddChannelDialog/AddChannelDialogContainer';
import { EditChannelDialogContainer } from '../EditChannelDialog/EditChannelDialogContainer';
import { SideBarContainer } from '../Sidebar/SidebarContainer';

type ChatProps = Readonly<{
  appName: string;
  userDisplayName: string;
  totalUsers: number;
  channelName: string;
  channelDescription?: string;
  channelMessages: ReadonlyArray<MessageUI>;
  channelsOverviewCatalog: ChannelsOverviewUI;
  canShowUserProfileDetails: boolean;
}>;

const MainContent = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className="fixed w-full flex chat-content">{children}</div>;
};

export const Chat = ({
  appName,
  totalUsers,
  userDisplayName,
  canShowUserProfileDetails,
  channelName,
  channelDescription,
  channelMessages,
  channelsOverviewCatalog,
}: ChatProps) => {
  const stateUI = useContext(StateContextUI);

  const [editChannelId, setEditChannelId] = useState<ChannelId>();

  const handleactiveEditChannelId = (channelId: ChannelId) =>
    setEditChannelId(channelId);

  const renderDialog = () => {
    switch (stateUI.dialog) {
      case Dialogs.AddChannel:
        return <AddChannelDialogContainer />;
      case Dialogs.EditChannel:
        return editChannelId ? (
          <EditChannelDialogContainer selectedChannelId={editChannelId} />
        ) : undefined;
      case Dialogs.None:
        return undefined;
    }
  };

  const renderSectionCenter = () => {
    switch (stateUI.sectionCenter) {
      case SectionCenter.Channel:
        return (
          <Channel
            totalUsers={totalUsers}
            channelName={channelName}
            channelDescription={channelDescription}
            messages={channelMessages}
          />
        );
      case SectionCenter.ChannelsCatalog:
        return (
          <ChannelsCatalog
            channels={channelsOverviewCatalog}
            activeEditChannelId={handleactiveEditChannelId}
          />
        );
    }
  };

  return (
    <div>
      <TopBar userDisplayName={userDisplayName} />
      <MainContent>
        <ErrorBoundary>
          <SideBarContainer />
        </ErrorBoundary>
        <ErrorBoundary>{renderSectionCenter()}</ErrorBoundary>
        <ErrorBoundary>
          {canShowUserProfileDetails && (
            <UserProfileDetailsContainer userDisplayName={userDisplayName} />
          )}
        </ErrorBoundary>
      </MainContent>
      {renderDialog()}
    </div>
  );
};
