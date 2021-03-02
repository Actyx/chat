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
import { MessageInput } from '../Channel/MessageInput';
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
  const stylesGrid: React.CSSProperties = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: canShowUserProfileDetails
      ? '240px auto 383px'
      : '240px auto',
    gridTemplateRows: '40px auto',
  };
  const stylesSectionCenter = cx('overflow-y-auto', {
    'col-span-2': !canShowUserProfileDetails,
  });

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
            />
            <MessageInput addMessage={handleAddMessage} />
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
    <div style={stylesGrid}>
      <div className="col-span-3">
        <TopBar userDisplayName={userDisplayName} />
      </div>
      <Sidebar
        channels={channelsSideBarUI}
        showAddChannelDialog={handleShowAddChannelDialog}
        activeChannelId={activeChannelId}
      />
      <div className={stylesSectionCenter}>{renderSectionCenter()}</div>
      {canShowUserProfileDetails && (
        <UserProfileDetails
          userDisplayName={userDisplayName}
          editUserProfile={handleEditUserProfile}
          close={handleHideUserProfileDetails}
        />
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
