import { Timestamp } from '@actyx/pond';
import React, { ReactNode } from 'react';
import { ChannelId } from '../../../../business-logic/message/types';
import { Header } from '../../../common/FlexPanel/Header';
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

const Body = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="overflow-y-auto">{children}</div>
);

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
    <div className="w-full overflow-y-auto	h-full">
      <div className="flex flex-col h-full">
        <Header>
          <Typography tag="div" weight="bold" color="gray-dark">
            Channels overview
          </Typography>
        </Header>
        <Body>
          {channels.map((c) => (
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
        </Body>
      </div>
    </div>
  );
};
