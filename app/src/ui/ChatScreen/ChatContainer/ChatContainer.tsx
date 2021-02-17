import { Pond } from '@actyx/pond';
import React, { FC, useContext, useEffect, useState } from 'react';
import {
  initialStateCannelFish,
  mainChannelFish,
} from '../../../business-logic/channel-fish/channel-fish';
import {
  editMessageInChannel,
  hideMessageFromChannel,
  addMessageToChannel,
} from '../../../business-logic/channel-fish/logic';
import { ChannelFishState } from '../../../business-logic/channel-fish/types';
import {
  ChannelsCatalogFish,
  initialStateChannelsCatalogFish,
} from '../../../business-logic/channels-catalog-fish/channels-catalog-fish';
import {
  addChannel,
  editChannel,
  getChannelProfileByChannelId,
} from '../../../business-logic/channels-catalog-fish/logic';
import { ChannelsCatalogFishState } from '../../../business-logic/channels-catalog-fish/types';
import { ChannelId, MessageId } from '../../../business-logic/message/types';
import { editUserProfile } from '../../../business-logic/users-catalog-fish/logic';
import { UsersCatalogFishState } from '../../../business-logic/users-catalog-fish/types';
import {
  initialStateUserCatalogFish,
  UsersCatalogFish,
} from '../../../business-logic/users-catalog-fish/users-catalog-fish';
import { closeSectionRight } from '../../ui-state-manager/actions';
import { SectionCenter, SectionRight } from '../../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../ui-state-manager/UIStateManager';
import { UserProfileDetails } from '../../UserProfileDetails/UserProfileDetails';
import { AddChannelDialog } from '../AddChannelDialog/AddChannelDialog';
import { Channel } from '../Channel/Channel';
import { MessageInput } from '../Channel/MessageInput';
import { ChannelsCatalog } from '../ChannelsCatalog/ChannelsCatalog';
import { EditChannelDialogContainer } from '../EditChannelDialog/EditChannelDialog';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar';
import {
  getDisplayNameByUser,
  getVisiblePublicMessages,
  mapChannelsToChannelCatalogUI,
  mapChannelsToSidebarUI,
  mapPublicMessagesToChannelUI,
} from './ui-map';

// TODO create separate modules
const MESSAGE = {
  invalidName: 'That name is already taken by a channel',
};

type Props = Readonly<{
  pond: Pond;
}>;

export const ChatContainer: FC<Props> = ({ pond }) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [openAddChannelDialog, setOpenAddChannelDialog] = useState<boolean>(
    false
  );

  const [openEditChannelDialog, setOpenEditChannelDialog] = useState<boolean>(
    false
  );

  const [selectedChannel, setSelectedChannel] = useState<
    Readonly<{ channelId: ChannelId; name: string; description: string }>
  >();

  const [messageInvalid, setMessageInvalid] = useState<string | undefined>();

  //#region Pond and Fishes
  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = useState<UsersCatalogFishState>(initialStateUserCatalogFish);

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = useState<ChannelFishState>(initialStateCannelFish);

  const [
    stateChannelsCatalogFish,
    setStateChannelsCatalogFish,
  ] = useState<ChannelsCatalogFishState>(initialStateChannelsCatalogFish);

  const [errorPond, setErrorPond] = useState<string>();

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UsersCatalogFish.fish,
      setStateUsersCatalogFish
    );

    const cancelSubChannelFish = pond.observe(
      mainChannelFish,
      setStateChannelMainFish
    );

    const cancelSubChannelsCatalogFish = pond.observe(
      ChannelsCatalogFish.fish,
      setStateChannelsCatalogFish
    );

    return () => {
      cancelSubUserCatalogFish();
      cancelSubChannelFish();
      cancelSubChannelsCatalogFish();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  //#region UI handlers

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const isUserProfileEdited = await editUserProfile(pond)(
        stateUI.signedInUser,
        displayName
      );
      if (isUserProfileEdited === true) {
        dispatch(closeSectionRight());
      }
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleAddMessage = async (content: string) => {
    try {
      await addMessageToChannel(pond)(
        stateUI.activeChannelId,
        stateUI.signedInUser
      )({
        content,
      });
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleEditMessage = async (messageId: MessageId, content: string) => {
    try {
      await editMessageInChannel(pond)(
        stateUI.activeChannelId,
        stateUI.signedInUser
      )(messageId, content);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleHideMessage = async (messageId: MessageId) => {
    const hasUserConfirmed = window.confirm(
      'Are you sure to hide this message?'
    );
    if (hasUserConfirmed) {
      try {
        await hideMessageFromChannel(pond)(
          stateUI.activeChannelId,
          stateUI.signedInUser
        )(messageId);
        setErrorPond(undefined);
      } catch (err) {
        setErrorPond(err);
      }
    }
  };

  const handleOpenAddChannelDialog = () => {
    setOpenAddChannelDialog(true);
  };

  const handleCloseAddChannelDialog = () => setOpenAddChannelDialog(false);

  const handleOpenEditChannelDialog = (channelId: ChannelId) => {
    const channelProfile = getChannelProfileByChannelId(
      channelId,
      stateChannelsCatalogFish.channels
    );
    if (channelProfile) {
      setSelectedChannel({
        channelId: channelProfile.channelId,
        name: channelProfile.name,
        description: channelProfile.description ?? '',
      });
      setOpenEditChannelDialog(true);
    }
  };

  const handleCloseEditChannelDialog = () => setOpenEditChannelDialog(false);

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const isSuccess = await addChannel(pond)(stateUI.signedInUser)(
        name,
        description
      );
      if (isSuccess) {
        setErrorPond(undefined);
        setMessageInvalid(undefined);
        handleCloseAddChannelDialog();
      } else {
        setMessageInvalid(MESSAGE.invalidName);
      }
    } catch (err) {
      setMessageInvalid(undefined);
      setErrorPond(err);
    }
  };

  const handleEditChannelFromDialog = async (
    name: string,
    description: string
  ) => {
    if (selectedChannel) {
      try {
        const isSuccess = await editChannel(pond)(
          stateUI.signedInUser,
          selectedChannel.channelId
        )(name, description);
        if (isSuccess) {
          setErrorPond(undefined);
          setMessageInvalid(undefined);
          handleCloseAddChannelDialog();
        } else {
          setMessageInvalid(MESSAGE.invalidName);
        }
      } catch (err) {
        setMessageInvalid(undefined);
        setErrorPond(err);
      }
    }
  };

  //#endregion

  //#region UI mapping
  const channelMessages = mapPublicMessagesToChannelUI(
    getVisiblePublicMessages(stateChannelMainFish.messages),
    stateUsersCatalogFish.users,
    stateUI.signedInUser
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.signedInUser,
    stateUsersCatalogFish.users
  );

  const canShowUserProfileEdit =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  const channelsSideBarUI = mapChannelsToSidebarUI(
    stateChannelsCatalogFish.channels
  );

  const channelsOverviewCatalog = mapChannelsToChannelCatalogUI(
    stateChannelsCatalogFish.channels,
    stateUsersCatalogFish.users,
    stateUI.signedInUser
  );
  //#endregion

  const renderSectionCenter = () => {
    switch (stateUI.sectionCenter) {
      case SectionCenter.Channel:
        return (
          <div>
            <Channel
              messages={channelMessages}
              editMessage={handleEditMessage}
              hideMessage={handleHideMessage}
            />
            <MessageInput addMessage={handleAddMessage} />
          </div>
        );
      case SectionCenter.ChannelsCatalog:
        return (
          <ChannelsCatalog
            channels={channelsOverviewCatalog}
            editChannel={handleOpenEditChannelDialog}
          />
        );
    }
  };

  return (
    <div>
      {errorPond}
      <TopBar userDisplayName={userDisplayName ?? ''} />
      <div>
        <Sidebar
          channels={channelsSideBarUI}
          openAddChannelDialog={handleOpenAddChannelDialog}
        />
      </div>
      {renderSectionCenter()}
      <div>
        {canShowUserProfileEdit && (
          <UserProfileDetails editUserProfile={handleEditUserProfile} />
        )}
      </div>
      {openAddChannelDialog && (
        <AddChannelDialog
          messageError={errorPond}
          messageInvalid={messageInvalid}
          addChannel={handleAddChannel}
          closeDialog={handleCloseAddChannelDialog}
        />
      )}
      {openEditChannelDialog && selectedChannel && (
        <EditChannelDialogContainer
          currentName={selectedChannel.name}
          currentDescription={selectedChannel.description}
          editChannel={handleEditChannelFromDialog}
          closeDialog={handleCloseEditChannelDialog}
        />
      )}
    </div>
  );
};
