import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { ChannelId } from '../../../../../business-logic/message/types';
import { StateContextUI } from '../../../../state-manager/UIStateManager';
import { ChannelOverviewUI } from './ChannelsCatalog';
import { ChannelOverview } from './ChannelOverview';
import { useFish } from '../../../../utils/use-fish';
import { wire } from '../../../../../business-logic/common/logic-wire';
import { archiveChannel } from '../../../../../business-logic/channel-catalog-fish/logic/archiveChannel';
import { unarchiveChannel } from '../../../../../business-logic/channel-catalog-fish/logic/unarchiveChannel';
import { associateUserToChannel } from '../../../../../business-logic/channel-catalog-fish/logic/associateUserToChannel';
import { dissociateUserChannel } from '../../../../../business-logic/channel-catalog-fish/logic/dissociateUserChannel';
import { hasUserCreatedChannel } from '../../../../../business-logic/channel-catalog-fish/logic-helpers';
import { UserCatalogFish } from '../../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateUIAuthenticated } from '../../../../state-manager/state-types';

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

  const stateUI = useContext(StateContextUI) as StateUIAuthenticated;

  const channelCatalogFishState = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const canUserManageArchiviation = (channelId: ChannelId) =>
    hasUserCreatedChannel(
      stateUI.userUUID,
      channelId,
      channelCatalogFishState.channels
    );

  const wirePond = wire(pond, ChannelCatalogFish);

  const performArchiveChannel = wirePond(archiveChannel);

  const handleArchiveChannel = async (channelId: ChannelId) => {
    const hasUserConfirmed = window.confirm(CONFIRM_ARCHIVE_CHANNEL);
    if (hasUserConfirmed) {
      performArchiveChannel(
        userCatalogFishState.users,
        stateUI.userUUID,
        channelId
      ).catch(setPondErrorMessage);
    }
  };

  const performAssociateUserToChannel = wirePond(associateUserToChannel);

  const handleAssociateUserChannel = async (channelId: ChannelId) =>
    performAssociateUserToChannel(
      userCatalogFishState.users,
      stateUI.userUUID,
      channelId
    ).catch(setPondErrorMessage);

  const performUnarchiveChannel = wire(
    pond,
    ChannelCatalogFish
  )(unarchiveChannel);

  const handleUnarchiveChannel = async (channelId: ChannelId) =>
    performUnarchiveChannel(
      userCatalogFishState.users,
      stateUI.userUUID,
      channelId
    ).catch(setPondErrorMessage);

  const performDissociateUserChannel = wirePond(dissociateUserChannel);

  const handleDissociateUserChannel = async (channelId: ChannelId) =>
    performDissociateUserChannel(
      userCatalogFishState.users,
      stateUI.userUUID,
      channelId
    ).catch(setPondErrorMessage);

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
