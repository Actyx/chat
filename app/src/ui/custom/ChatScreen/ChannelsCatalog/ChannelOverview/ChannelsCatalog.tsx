import { Timestamp } from '@actyx/pond';
import { ChannelId } from '../../../../../business-logic/message/types';
import { Button } from '../../../../common/Button/Button';
import { CentralSection } from '../../../../common/CentralSection/CentralSection';
import { SpeakerphoneIcon } from '../../../../common/Icons/SpeakerphoneIcon';
import { Typography } from '../../../../common/Typography/Typography';
import { ChannelOverviewContainer } from './ChannelOverviewContainer';

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
  showAddChannelDialog: () => void;
  showEditChannelDialog: (channelId: ChannelId) => void;
}>;

export const ChannelsCatalog = ({
  channels,
  showAddChannelDialog,
  showEditChannelDialog,
}: ChannelsCatalogProps) => {
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
          <Button type="button" color="white" click={showAddChannelDialog}>
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
