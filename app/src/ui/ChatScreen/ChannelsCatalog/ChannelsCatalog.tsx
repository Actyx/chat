import { Timestamp } from '@actyx/pond';
import { ChannelId } from '../../../business-logic/message/types';

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
    <div className="w-full">
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
              {c.usersAssociatedTotal} members{' '}
              {`(${c.usersAssociated.join(', ')})`}
              <br />
              {`Created by: ${c.createdBy} on ${c.createdOn}`}
              <br />
              {c.editedBy && (
                <>
                  {`Edited by ${c.editedBy} on ${c.editedOn}`}
                  <br />
                </>
              )}
              {c.isSignedInUserAssociated && <strong>Joined</strong>}
              <br />
              <button onClick={() => editChannel(c.channelId)}>
                Edit channel
              </button>
              {canUserManageArchive && c.isArchived && (
                <button onClick={() => unarchiveChannel(c.channelId)}>
                  Unarchive channel
                </button>
              )}
              {canUserManageArchive && !c.isArchived && (
                <button onClick={() => archiveChannel(c.channelId)}>
                  Archive channel
                </button>
              )}
              {c.isSignedInUserAssociated && !c.isSystemUser && (
                <button onClick={() => dissociateUserChannel(c.channelId)}>
                  Leave channel
                </button>
              )}
              {!c.isSignedInUserAssociated && !c.isSystemUser && (
                <button onClick={() => associateUserChannel(c.channelId)}>
                  Join channel
                </button>
              )}
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
