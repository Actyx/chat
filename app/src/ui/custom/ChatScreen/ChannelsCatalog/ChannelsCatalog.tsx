import { Timestamp } from '@actyx/pond';
import React, { useContext } from 'react';
import { ChannelId } from '../../../../business-logic/message/types';
import { Button } from '../../../common/Button/Button';
import { CentralSection } from '../../../common/CentralSection/CentralSection';
import { SpeakerphoneIcon } from '../../../common/Icons/SpeakerphoneIcon';
import { Typography } from '../../../common/Typography/Typography';
import { showAddChannelDialog } from '../../../state-manager/actions';
import { DispatchContextUI } from '../../../state-manager/UIStateManager';
import { ChannelOverviewContainer } from './ChannelOverview/ChannelOverviewContainer';

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
  showEditChannelDialog: (channelId: ChannelId) => void;
  canUserManageArchiviation: (channelId: ChannelId) => boolean;
}>;

export const ChannelsCatalog = ({
  channels,
  showEditChannelDialog,
}: ChannelsCatalogProps) => {
  const dispatch = useContext(DispatchContextUI);

  const handleShowAddDialog = () => dispatch(showAddChannelDialog());

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
          <Button type="button" color="white" click={handleShowAddDialog}>
            Create Channel
          </Button>
        </>
      }
      body={channels.map((c) => (
        <ChannelOverviewContainer
          key={c.channelId}
          channelOverview={c}
          showEditChannelDialog={showEditChannelDialog}
        />
      ))}
    />
  );
};
