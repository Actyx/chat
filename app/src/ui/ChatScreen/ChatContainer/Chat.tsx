import React from 'react';
import { SectionCenter } from '../../ui-state-manager/types';
import { ChannelsListUI, Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar';
import cx from 'classnames';
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
import './chat.css';

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

  const gridLayout = cx(
    'fixed grid w-screen h-screen',
    canShowUserProfileDetails ? 'chat-grid-col-3' : 'chat-grid-col-2'
  );
  const contentLayout = canShowUserProfileDetails ? 'col-span-1' : 'col-span-2';
  return (
    <div className={gridLayout}>
      <div className="col-span-3">
        <TopBar userDisplayName={userDisplayName} />
      </div>
      <div className="col-span-1">
        <Sidebar
          channels={channelsSideBarUI}
          showAddChannelDialog={handleShowAddChannelDialog}
          activeChannelId={activeChannelId}
        />
      </div>
      <div className={contentLayout}>{renderSectionCenter()}</div>
      {canShowUserProfileDetails && (
        <div className="col-span-1">
          <UserProfileDetails
            userDisplayName={userDisplayName}
            editUserProfile={handleEditUserProfile}
            close={handleHideUserProfileDetails}
          />
        </div>
      )}
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
