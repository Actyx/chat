import React, { ReactNode, useContext } from 'react';
import { SectionCenter } from '../../../ui-state-manager/types';
import { ChannelsListUI, Sidebar, UsersListUI } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar';
import { UserProfileDetails } from '../../UserProfileDetails/UserProfileDetails';
import { Channel } from '../Channel/Channel';
import {
  ChannelsCatalog,
  ChannelsOverviewUI,
} from '../ChannelOverview/ChannelsCatalog';
import { MessageUI } from '../Channel/Message';
import { ChannelId, MessageId } from '../../../../business-logic/message/types';
import { EditChannelDialog } from '../EditChannelDialog/EditChannelDialog';
import { AddChannelDialog } from '../AddChannelDialog/AddChannelDialog';
import './chat.css';
import { StateContextUI } from '../../../ui-state-manager/UIStateManager';

type ChatProps = Readonly<{
  appName: string;
  totalUsers: number;
  userDisplayName: string;
  channelsSideBarUI: ChannelsListUI;
  usersSideBarUI: UsersListUI;
  channelName: string;
  channelDescription: string;
  channelMessages: ReadonlyArray<MessageUI>;
  channelsOverviewCatalog: ChannelsOverviewUI;
  showAddChannelDialog: boolean;
  showEditChannelDialog: boolean;
  selectedChannel?: Readonly<{
    channelId: ChannelId;
    name: string;
    description: string;
  }>;
  canShowUserProfileDetails: boolean;
  canUserManageArchiviation: (channelId: ChannelId) => boolean;
  pondErrorMessage?: string;
  invalidMessage?: string;
  handleShowAddChannelDialog: () => void;
  handleEditUserProfile: (displayName: string) => void;
  handleAddMessage: (content: string) => void;
  handleEditMessage: (messageId: MessageId, content: string) => void;
  handleHideMessage: (messageId: MessageId) => void;
  handleAddChannel: (name: string, description: string) => void;
  handleCloseEditChannelDialog: () => void;
  handleHideAddChannelDialog: () => void;
  handleShowEditChannelDialog: (channelId: ChannelId) => void;
  handleArchiveChannel: (channelId: ChannelId) => void;
  handleUnarchiveChannel: (channelId: ChannelId) => void;
  handleAssociateUserChannel: (channelId: ChannelId) => void;
  handleDissociateUserChannel: (channelId: ChannelId) => void;
  handleHideUserProfileDetails: () => void;
  handleEditChannel: (
    channelId: ChannelId,
    newName: string,
    newDescription: string
  ) => void;
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
  handleShowAddChannelDialog,
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
  showAddChannelDialog,
  showEditChannelDialog,
  selectedChannel,
  pondErrorMessage,
  handleEditChannel,
  invalidMessage,
  handleAddChannel,
  handleCloseEditChannelDialog,
  handleHideAddChannelDialog,
}: ChatProps) => {
  const stateUI = useContext(StateContextUI);

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
          />
        );
    }
  };

  return (
    <div>
      <TopBar userDisplayName={userDisplayName} />
      <MainContent>
        <Sidebar
          appName={appName}
          channels={channelsSideBarUI}
          users={usersSideBarUI}
          showAddChannelDialog={handleShowAddChannelDialog}
        />
        {renderSectionCenter()}
        {canShowUserProfileDetails && (
          <UserProfileDetails
            userDisplayName={userDisplayName}
            editUserProfile={handleEditUserProfile}
            close={handleHideUserProfileDetails}
          />
        )}
      </MainContent>

      {showAddChannelDialog && (
        <AddChannelDialog
          errorMessage={pondErrorMessage}
          invalidMessage={invalidMessage}
          addChannel={handleAddChannel}
          closeDialog={handleHideAddChannelDialog}
        />
      )}
      {showEditChannelDialog && selectedChannel && (
        <EditChannelDialog
          currentName={selectedChannel.name}
          currentDescription={selectedChannel.description}
          editChannel={(newName, newDescription) =>
            handleEditChannel(
              selectedChannel.channelId,
              newName,
              newDescription
            )
          }
          closeDialog={handleCloseEditChannelDialog}
        />
      )}
      {pondErrorMessage}
    </div>
  );
};
