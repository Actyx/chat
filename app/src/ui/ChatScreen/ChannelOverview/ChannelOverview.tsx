import { ChannelId } from '../../../business-logic/message/types';
import { Submit } from '../../common/Form/Submit/Submit';
import { CheckIcon } from '../../common/Icons/CheckIcon';
import { Typography } from '../../common/Typography/Typography';
import { DateTime } from '../../DateTime/DateTime';
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
    <div className="p-4 space-y-4">
      <div>
        <div>
          <div className="flex space-x-2">
            <Typography tag="div" weight="bold" color="gray-dark">
              #{name}
            </Typography>
            {isArchived && (
              <Typography tag="div" color="gray-medium">
                (archived)
              </Typography>
            )}
          </div>
          {description && (
            <Typography tag="div" color="gray-medium">
              {description}
            </Typography>
          )}
          <Typography tag="div" color="gray-medium">
            {usersAssociatedTotal} members {`(${usersAssociated.join(', ')})`}
          </Typography>
          <Typography tag="div" color="gray-medium">
            {`Created by: ${createdBy} on `} <DateTime timestamp={createdOn} />
          </Typography>
          {editedBy && (
            <Typography tag="div" color="gray-medium">
              {`Last edited by ${editedBy} on ${editedOn}`}
              <br />
            </Typography>
          )}
          {isSignedInUserAssociated && (
            <div className="flex space-x-1 items-center">
              <CheckIcon color="green-medium" />
              <Typography tag="div" color="green-medium" weight="semibold">
                Joined
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="space-x-3">
        <Submit
          variant="button"
          color="white"
          click={() => editChannel(channelId)}
        >
          Edit
        </Submit>
        {canUserManageArchive && isArchived && (
          <Submit
            variant="button"
            color="white"
            click={() => unarchiveChannel(channelId)}
          >
            Unarchive
          </Submit>
        )}
        {canUserManageArchive && !isArchived && (
          <Submit
            variant="button"
            color="white"
            click={() => archiveChannel(channelId)}
          >
            Archive
          </Submit>
        )}
        {isSignedInUserAssociated && !isSystemUser && (
          <Submit
            variant="button"
            color="white"
            click={() => dissociateUserChannel(channelId)}
          >
            Leave
          </Submit>
        )}
        {!isSignedInUserAssociated && !isSystemUser && (
          <Submit
            variant="button"
            color="green"
            click={() => associateUserChannel(channelId)}
          >
            Join channel
          </Submit>
        )}
      </div>
    </div>
  );
};
