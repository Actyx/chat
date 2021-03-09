import { Timestamp } from '@actyx/pond';
import React, { useState } from 'react';
import { ChannelId } from '../../../../business-logic/message/types';
import { Alert } from '../../../common/Alert/Alert';
import { Button } from '../../../common/Button/Button';
import { CentralSection } from '../../../common/CentralSection/CentralSection';
import { SpeakerphoneIcon } from '../../../common/Icons/SpeakerphoneIcon';
import { Typography } from '../../../common/Typography/Typography';
import { ChannelOverview } from './ChannelOverview';

export type ChannelOverviewUI = Readonly<{
  channelId: ChannelId;
  name: string;
  description?: string;
  createdOn: Timestamp;
  createdBy: string;
  editedOn?: Timestamp;
  editedBy?: string;
  isArchived: boolean;
  usersAssociatedTotal: number;
  usersAssociated: ReadonlyArray<string>;
  isSystemUser: boolean;
  isSignedInUserAssociated: boolean;
}>;

export type ChannelsOverviewUI = ReadonlyArray<ChannelOverviewUI>;

type ChannelsCatalogProps = Readonly<{
  channels: ChannelsOverviewUI;
  editChannel: (channelId: ChannelId) => void;
  canUserManageArchiviation: (channelId: ChannelId) => boolean;
  archiveChannel: (channelId: ChannelId) => Promise<boolean>;
  unarchiveChannel: (channelId: ChannelId) => Promise<boolean>;
  associateUserChannel: (channelId: ChannelId) => void;
  dissociateUserChannel: (channelId: ChannelId) => void;
  showAddChannel: () => void;
}>;

export const ChannelsCatalog = ({
  channels,
  editChannel,
  canUserManageArchiviation,
  archiveChannel,
  unarchiveChannel,
  associateUserChannel,
  dissociateUserChannel,
  showAddChannel,
}: ChannelsCatalogProps) => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleArchiveChannel = async (channelId: ChannelId) => {
    try {
      await archiveChannel(channelId);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleUnarchiveChannel = async (channelId: ChannelId) => {
    try {
      await unarchiveChannel(channelId);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleAssociateUserChannel = async (channelId: ChannelId) => {
    try {
      await associateUserChannel(channelId);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleDissociateUserChannel = async (channelId: ChannelId) => {
    try {
      await dissociateUserChannel(channelId);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  return (
    <CentralSection
      header={
        <>
          <div className="flex space-x-1 items-center">
            <SpeakerphoneIcon size="base" color="gray-dark" />
            <Typography tag="div" weight="bold" color="gray-dark">
              Channels overview
            </Typography>
          </div>
          <Button type="button" color="white" click={showAddChannel}>
            Create Channel
          </Button>
        </>
      }
      body={channels.map((c) => (
        <ChannelOverview
          key={c.channelId}
          channelOverview={c}
          editChannel={editChannel}
          canUserManageArchiviation={canUserManageArchiviation}
          archiveChannel={handleArchiveChannel}
          unarchiveChannel={handleUnarchiveChannel}
          associateUserChannel={handleAssociateUserChannel}
          dissociateUserChannel={handleDissociateUserChannel}
        />
      ))}
      footer={
        pondErrorMessage && (
          <div className="pr-4 bottom-0 w-full">
            <Alert variant="danger">{pondErrorMessage}</Alert>
          </div>
        )
      }
    />
  );
};
