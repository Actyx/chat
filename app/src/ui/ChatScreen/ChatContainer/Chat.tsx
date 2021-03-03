import React from 'react';
import { SectionCenter } from '../../ui-state-manager/types';
import { ChannelsListUI, Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar';
import { UserProfileDetails } from '../../UserProfileDetails/UserProfileDetails';
import { Channel } from '../Channel/Channel';
import {
  ChannelsCatalog,
  ChannelsOverviewUI,
} from '../ChannelsCatalog/ChannelsCatalog';
import { MessageUI } from '../Channel/Message';
import { ChannelId, MessageId } from '../../../business-logic/message/types';
import { EditChannelDialog } from '../EditChannelDialog/EditChannelDialog';
import { AddChannelDialog } from '../AddChannelDialog/AddChannelDialog';

type ChatProps = Readonly<{
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
  userDisplayName: string;
  channelsSideBarUI: ChannelsListUI;
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

export const Chat = ({
  activeChannelId,
  sectionCenter,
  userDisplayName,
  channelsSideBarUI,
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
  const renderSectionCenter = () => {
    switch (sectionCenter) {
      case SectionCenter.Channel:
        return (
          <>
            <Channel
              channelName={channelName}
              channelDescription={channelDescription}
              messages={channelMessages}
              editMessage={handleEditMessage}
              hideMessage={handleHideMessage}
              addMessage={handleAddMessage}
            />
          </>
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
      <div
        data-test="header"
        style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          height: '2.5rem',
        }}
      >
        <TopBar userDisplayName={userDisplayName} />
      </div>
      <div
        data-test="body"
        style={{
          position: 'fixed',
          top: '2.5rem',
          left: 0,
          height: 'calc(100% - 2.5rem)',
          width: '100%',
          display: 'flex',
        }}
      >
        <div style={{ minWidth: '15rem' }}>
          <Sidebar
            channels={channelsSideBarUI}
            showAddChannelDialog={handleShowAddChannelDialog}
            activeChannelId={activeChannelId}
          />
        </div>
        <div style={{ width: '100%' }}>{renderSectionCenter()}</div>
        {canShowUserProfileDetails && (
          <div>
            <UserProfileDetails
              userDisplayName={userDisplayName}
              editUserProfile={handleEditUserProfile}
              close={handleHideUserProfileDetails}
            />
          </div>
        )}
      </div>

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
