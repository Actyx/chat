import { ChannelId } from '../../../business-logic/message/types';
import { ChannelOverviewUI } from './ChannelsCatalog';

type ChannelDetailsProps = Readonly<{
  channelOverview: ChannelOverviewUI;
  editChannel: (channelId: ChannelId) => void;
  canUserManageArchiviation: (channelId: ChannelId) => boolean;
  archiveChannel: (channelId: ChannelId) => void;
  unarchiveChannel: (channelId: ChannelId) => void;
  associateUserChannel: (channelId: ChannelId) => void;
  dissociateUserChannel: (channelId: ChannelId) => void;
}>;

export const ChannelOverview = ({
  channelOverview: {
    channelId,
    name,
    isArchived,
    description,
    isSignedInUserAssociated,
    usersAssociatedTotal,
    isSystemUser,
    usersAssociated,
    editedBy,
    createdBy,
    createdOn,
    editedOn,
  },
  editChannel,
  canUserManageArchiviation,
  archiveChannel,
  unarchiveChannel,
  associateUserChannel,
  dissociateUserChannel,
}: ChannelDetailsProps) => {
  const canUserManageArchive = canUserManageArchiviation(channelId);

  return (
    <div key={channelId}>
      {name}
      {isArchived && ' (ARCHIVED)'}
      <br />
      {description && (
        <>
          {description} <br />
        </>
      )}
      {usersAssociatedTotal} members {`(${usersAssociated.join(', ')})`}
      <br />
      {`Created by: ${createdBy} on ${createdOn}`}
      <br />
      {editedBy && (
        <>
          {`Edited by ${editedBy} on ${editedOn}`}
          <br />
        </>
      )}
      {isSignedInUserAssociated && <strong>Joined</strong>}
      <br />
      <button onClick={() => editChannel(channelId)}>Edit channel</button>
      {canUserManageArchive && isArchived && (
        <button onClick={() => unarchiveChannel(channelId)}>
          Unarchive channel
        </button>
      )}
      {canUserManageArchive && !isArchived && (
        <button onClick={() => archiveChannel(channelId)}>
          Archive channel
        </button>
      )}
      {isSignedInUserAssociated && !isSystemUser && (
        <button onClick={() => dissociateUserChannel(channelId)}>
          Leave channel
        </button>
      )}
      {!isSignedInUserAssociated && !isSystemUser && (
        <button onClick={() => associateUserChannel(channelId)}>
          Join channel
        </button>
      )}
      <hr />
    </div>
  );
};
