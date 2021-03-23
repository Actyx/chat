import { usePond } from '@actyx-contrib/react-pond';
import React, { useState } from 'react';
import { ChannelCatalogFish } from '../../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { ChannelId } from '../../../../../business-logic/message/types';
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
import { UserUUID } from '../../../../../business-logic/user-catalog-fish/types';

type ChannelOverviewContainerProps = Readonly<{
  userUUID: UserUUID;
  channelOverview: ChannelOverviewUI;
  showEditChannelDialog: (channelId: ChannelId) => void;
}>;

const CONFIRM_ARCHIVE_CHANNEL =
  "Are you sure to archive this channel? The channel won't be accessible anymore to its members.";

export const ChannelOverviewContainer = ({
  userUUID,
  channelOverview,
  showEditChannelDialog,
}: ChannelOverviewContainerProps) => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const pond = usePond();

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
      userUUID,
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
        userUUID,
        channelId
      ).catch(setPondErrorMessage);
    }
  };

  const performAssociateUserToChannel = wirePond(associateUserToChannel);

  const handleAssociateUserChannel = async (channelId: ChannelId) =>
    performAssociateUserToChannel(
      userCatalogFishState.users,
      userUUID,
      channelId
    ).catch(setPondErrorMessage);

  const performUnarchiveChannel = wire(
    pond,
    ChannelCatalogFish
  )(unarchiveChannel);

  const handleUnarchiveChannel = async (channelId: ChannelId) =>
    performUnarchiveChannel(
      userCatalogFishState.users,
      userUUID,
      channelId
    ).catch(setPondErrorMessage);

  const performDissociateUserChannel = wirePond(dissociateUserChannel);

  const handleDissociateUserChannel = async (channelId: ChannelId) =>
    performDissociateUserChannel(
      userCatalogFishState.users,
      userUUID,
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
