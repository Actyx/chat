import React, { ReactNode, useContext } from 'react';
import { Dialogs, SectionCenter } from '../../../state-manager/types';
import { ChannelsListUI, Sidebar, UsersListUI } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar';
import { UserProfileDetails } from '../../UserProfileDetails/UserProfileDetails';
import { Channel } from '../Channel/Channel';
import {
  ChannelsCatalog,
  ChannelsOverviewUI,
} from '../ChannelsCatalog/ChannelsCatalog';
import { MessageUI } from '../Channel/Message';
import { ChannelId, MessageId } from '../../../../business-logic/message/types';
import { EditChannelDialog } from '../EditChannelDialog/EditChannelDialog';
import { AddChannelDialog } from '../AddChannelDialog/AddChannelDialog';
import './chat.css';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { ErrorBoundary } from '../../../common/ErrorBoundary/ErrorBoundary';
import { EditUserProfileResult } from '../../../../business-logic/user-catalog-fish/types';
import { AddChannelLogicResult } from '../../../../business-logic/channel-catalog-fish/types';

type ChatProps = Readonly<{
  appName: string;
  userDisplayName: string;
  channelsSideBarUI: ChannelsListUI;
  usersSideBarUI: UsersListUI;
  totalUsers: number;
  channelName: string;
  channelDescription?: string;
  channelMessages: ReadonlyArray<MessageUI>;
  channelsOverviewCatalog: ChannelsOverviewUI;
  selectedChannel?: Readonly<{
    channelId: ChannelId;
    name: string;
    description: string;
  }>;
  canUserManageArchiviation: (channelId: ChannelId) => boolean;
  canShowUserProfileDetails: boolean;
  handleShowAddChannelDialog: () => void;
  handleShowEditChannelDialog: (channelId: ChannelId) => void;
  handleEditUserProfile: (
    displayName: string
  ) => Promise<EditUserProfileResult>;
  handleAddMessage: (content: string) => Promise<boolean>;
  handleEditMessage: (messageId: MessageId, content: string) => void;
  handleHideMessage: (messageId: MessageId) => void;
  handleAddChannel: (
    name: string,
    description: string
  ) => Promise<AddChannelLogicResult>;
  handleEditChannel: (
    channelId: ChannelId,
    newName: string,
    newDescription: string
  ) => Promise<boolean>;
  handleArchiveChannel: (channelId: ChannelId) => Promise<boolean>;
  handleUnarchiveChannel: (channelId: ChannelId) => Promise<boolean>;
  handleAssociateUserChannel: (channelId: ChannelId) => void;
  handleDissociateUserChannel: (channelId: ChannelId) => void;
  handleHideUserProfileDetails: () => void;
  handleHideDialog: () => void;
}>;

const MainContent = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className="fixed w-full flex chat-content">{children}</div>;
};

export const Chat = ({
  appName,
  totalUsers,
  userDisplayName,
  channelsSideBarUI,
  usersSideBarUI,
  canShowUserProfileDetails,
  handleAddMessage,
  handleEditUserProfile,
  handleEditMessage,
  handleHideMessage,
  channelName,
  channelDescription,
  channelMessages,
  channelsOverviewCatalog,
  canUserManageArchiviation,
  handleShowEditChannelDialog,
  handleArchiveChannel,
  handleUnarchiveChannel,
  handleAssociateUserChannel,
  handleDissociateUserChannel,
  handleHideUserProfileDetails,
  selectedChannel,
  handleEditChannel,
  handleAddChannel,
  handleHideDialog,
  handleShowAddChannelDialog,
}: ChatProps) => {
  const stateUI = useContext(StateContextUI);

  const renderDialog = () => {
    switch (stateUI.dialog) {
      case Dialogs.AddChannel:
        return (
          <AddChannelDialog
            closeDialog={handleHideDialog}
            addChannel={handleAddChannel}
          />
        );
      case Dialogs.EditChannel:
        return selectedChannel ? (
          <EditChannelDialog
            currentName={selectedChannel.name}
            currentDescription={selectedChannel.description}
            closeDialog={handleHideDialog}
            editChannel={(newName, newDescription) =>
              handleEditChannel(
                selectedChannel.channelId,
                newName,
                newDescription
              )
            }
          />
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
            editMessage={handleEditMessage}
            hideMessage={handleHideMessage}
            addMessage={handleAddMessage}
          />
        );
      case SectionCenter.ChannelsCatalog:
        return (
          <ChannelsCatalog
            channels={channelsOverviewCatalog}
            canUserManageArchiviation={canUserManageArchiviation}
            editChannel={handleShowEditChannelDialog}
            archiveChannel={handleArchiveChannel}
            unarchiveChannel={handleUnarchiveChannel}
            associateUserChannel={handleAssociateUserChannel}
            dissociateUserChannel={handleDissociateUserChannel}
            showAddChannel={handleShowAddChannelDialog}
          />
        );
    }
  };

  return (
    <div>
      <TopBar userDisplayName={userDisplayName} />
      <MainContent>
        <ErrorBoundary>
          <Sidebar
            appName={appName}
            channels={channelsSideBarUI}
            users={usersSideBarUI}
          />
        </ErrorBoundary>
        <ErrorBoundary>{renderSectionCenter()}</ErrorBoundary>
        <ErrorBoundary>
          {canShowUserProfileDetails && (
            <UserProfileDetails
              userDisplayName={userDisplayName}
              editUserProfile={handleEditUserProfile}
              close={handleHideUserProfileDetails}
            />
          )}
        </ErrorBoundary>
      </MainContent>
      {renderDialog()}
    </div>
  );
};
