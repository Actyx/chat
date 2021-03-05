import { Timestamp } from '@actyx/pond';
import React from 'react';
import { ChannelId } from '../../../../business-logic/message/types';
import {
  CentralSection,
  Header,
} from '../../../common/CentralSection/CentralSection';
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
  archiveChannel: (channelId: ChannelId) => void;
  unarchiveChannel: (channelId: ChannelId) => void;
  associateUserChannel: (channelId: ChannelId) => void;
  dissociateUserChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsCatalog = ({
  channels,
  editChannel,
  canUserManageArchiviation,
  archiveChannel,
  unarchiveChannel,
  associateUserChannel,
  dissociateUserChannel,
}: ChannelsCatalogProps) => {
  return (
    <CentralSection
      header={
        <Header>
          <Typography tag="div" weight="bold" color="gray-dark">
            Channels overview
          </Typography>
        </Header>
      }
      body={channels.map((c) => (
        <ChannelOverview
          key={c.channelId}
          channelOverview={c}
          editChannel={editChannel}
          canUserManageArchiviation={canUserManageArchiviation}
          archiveChannel={archiveChannel}
          unarchiveChannel={unarchiveChannel}
          associateUserChannel={associateUserChannel}
          dissociateUserChannel={dissociateUserChannel}
        />
      ))}
    />
  );
};
