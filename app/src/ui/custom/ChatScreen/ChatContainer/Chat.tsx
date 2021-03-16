import React, { ReactNode, useContext, useState } from 'react';
import { Dialogs, SectionCenter } from '../../../state-manager/types';
import { TopBar } from '../TopBar';
import { Channel } from '../Channel/Channel';
import { MessageUI } from '../Channel/Message';
import { ChannelId } from '../../../../business-logic/message/types';
import './chat.css';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { ErrorBoundary } from '../../../common/ErrorBoundary/ErrorBoundary';
import { UserProfileDetailsContainer } from '../../UserProfileDetails/UserProfileDetailsContainer';
import { AddChannelDialogContainer } from '../AddChannelDialog/AddChannelDialogContainer';
import { EditChannelDialogContainer } from '../EditChannelDialog/EditChannelDialogContainer';
import { SideBarContainer } from '../Sidebar/SidebarContainer';
import { ChannelsCatalogContainer } from '../ChannelsCatalog/ChannelOverview/ChannelsCatalogContainer';

type ChatProps = Readonly<{
  userDisplayName: string;
  totalUsers: number;
  canShowUserProfileDetails: boolean;
  channelName: string;
  channelDescription?: string;
  channelMessages: ReadonlyArray<MessageUI>;
}>;

const MainContent = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className="fixed w-full flex chat-content">{children}</div>;
};

export const Chat = ({
  userDisplayName,
  totalUsers,
  canShowUserProfileDetails,
  channelName,
  channelDescription,
  channelMessages,
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
          <ChannelsCatalogContainer
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
