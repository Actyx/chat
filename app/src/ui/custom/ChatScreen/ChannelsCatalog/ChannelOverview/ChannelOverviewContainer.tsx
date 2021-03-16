import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import {
  archiveChannel,
  associateUserToChannel,
  dissociateUserChannel,
  hasUserCreatedChannel,
  unarchiveChannel,
} from '../../../../../business-logic/channel-catalog-fish/logic';
import { ChannelId } from '../../../../../business-logic/message/types';
import { StateContextUI } from '../../../../state-manager/UIStateManager';
import { ChannelOverviewUI } from '../ChannelsCatalog';
import { ChannelOverview } from './ChannelOverview';
import { useFish } from '../../../../utils/use-fish';

type ChannelOverviewContainerProps = Readonly<{
  channelOverview: ChannelOverviewUI;
  showEditChannelDialog: (channelId: ChannelId) => void;
}>;

const CONFIRM_ARCHIVE_CHANNEL =
  "Are you sure to archive this channel? The channel won't be accessible anymore to its members.";

export const ChannelOverviewContainer = ({
  channelOverview,
  showEditChannelDialog,
}: ChannelOverviewContainerProps) => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const stateChannelsCatalogFish = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const canUserManageArchiviation = (channelId: ChannelId) =>
    hasUserCreatedChannel(
      stateUI.userUUID,
      channelId,
      stateChannelsCatalogFish.channels
    );

  const handleArchiveChannel = async (channelId: ChannelId) => {
    const hasUserConfirmed = window.confirm(CONFIRM_ARCHIVE_CHANNEL);
    if (hasUserConfirmed) {
      try {
        await archiveChannel(pond)(stateUI.userUUID, channelId);
      } catch (err) {
        setPondErrorMessage(err);
      }
    }
  };

  const handleAssociateUserChannel = async (channelId: ChannelId) => {
    try {
      await associateUserToChannel(pond)(stateUI.userUUID, channelId);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleUnarchiveChannel = async (channelId: ChannelId) => {
    try {
      await unarchiveChannel(pond)(stateUI.userUUID, channelId);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleDissociateUserChannel = async (channelId: ChannelId) => {
    try {
      await dissociateUserChannel(pond)(stateUI.userUUID, channelId);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  return (
    <ChannelOverview
      pondErrorMessage={pondErrorMessage}
      channelOverview={channelOverview}
      showEditChannelDialog={showEditChannelDialog}
      canUserManageArchiviation={canUserManageArchiviation}
      archiveChannel={handleArchiveChannel}
      unarchiveChannel={handleUnarchiveChannel}
      associateUserChannel={handleAssociateUserChannel}
      dissociateUserChannel={handleDissociateUserChannel}
    />
  );
};
