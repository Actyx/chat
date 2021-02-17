import { FC } from 'react';
import { Timestamp } from '@actyx/pond';
import { ChannelId } from '../../../business-logic/message/types';

export type ChannelsOverview = ReadonlyArray<{
  channelId: ChannelId;
  name: string;
  description?: string;
  createdOn: Timestamp;
  createdBy?: string;
  editedOn?: Timestamp;
  editedBy?: string;
  isArchived: boolean;
  usersAssociatedTotal: number;
  isSignedInUserAssociated: boolean;
}>;

type Props = Readonly<{
  channels: ChannelsOverview;
  editChannel: (channelId: ChannelId) => void;
  canUserManageArchiviation: (channelId: ChannelId) => boolean;
  archiveChannel: (channelId: ChannelId) => void;
  unarchiveChannel: (channelId: ChannelId) => void;
}>;

export const ChannelsCatalog: FC<Props> = ({
  channels,
  editChannel,
  canUserManageArchiviation,
  archiveChannel,
  unarchiveChannel,
}) => {
  return (
    <div>
      <h2>Channels Catalog</h2>
      <div>
        {channels.map((c) => {
          const canUserManageArchive = canUserManageArchiviation(c.channelId);

          return (
            <div key={c.channelId}>
              {c.name}
              {c.isArchived && ' (ARCHIVED)'}
              <br />
              {c.description && (
                <>
                  {c.description} <br />
                </>
              )}
              {c.usersAssociatedTotal} members
              <br />
              {`Created by: ${c.createdBy} on ${c.createdOn}`}
              <br />
              {c.editedBy && (
                <>
                  Edited by ${c.editedBy} on ${c.editedOn}
                  <br />
                </>
              )}
              {c.isSignedInUserAssociated && 'joined'}
              <br />
              <button onClick={() => editChannel(c.channelId)}>
                Edit channel
              </button>
              {canUserManageArchive && (
                <>
                  <button onClick={() => archiveChannel(c.channelId)}>
                    Archive channel
                  </button>
                  <button onClick={() => unarchiveChannel(c.channelId)}>
                    Unarchive channel
                  </button>
                </>
              )}
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
