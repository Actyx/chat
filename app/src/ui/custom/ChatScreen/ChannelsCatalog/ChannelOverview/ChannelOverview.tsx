import cn from 'classnames';
import React, { useState } from 'react';
import { ChannelId } from '../../../../../business-logic/message/types';
import { Button } from '../../../../common/Button/Button';
import { CheckIcon } from '../../../../common/Icons/CheckIcon';
import { Typography } from '../../../../common/Typography/Typography';
import { DateTime } from '../../../../common/DateTime/DateTime';
import { ChannelOverviewUI } from '../ChannelsCatalog';
import { Alert } from '../../../../common/Alert/Alert';

type ChannelDetailsProps = Readonly<{
  pondErrorMessage?: string;
  channelOverview: ChannelOverviewUI;
  showEditChannelDialog: (channelId: ChannelId) => void;
  canUserManageArchiviation: (channelId: ChannelId) => boolean;
  archiveChannel: (channelId: ChannelId) => void;
  unarchiveChannel: (channelId: ChannelId) => void;
  associateUserChannel: (channelId: ChannelId) => void;
  dissociateUserChannel: (channelId: ChannelId) => void;
}>;

export const ChannelOverview = ({
  pondErrorMessage,
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
  showEditChannelDialog,
  canUserManageArchiviation,
  archiveChannel,
  unarchiveChannel,
  associateUserChannel,
  dissociateUserChannel,
}: ChannelDetailsProps) => {
  const canUserManageArchive = canUserManageArchiviation(channelId);

  const [isCursorHover, setIsCursorHover] = useState<boolean>(false);

  const handleMouseEnter = () => setIsCursorHover(true);

  const handleMouseLeave = () => setIsCursorHover(false);

  const stylesChannelOverview = cn('flex space-y-4 border-b', {
    'hover:bg-gray-50': isCursorHover,
    'bg-white': !isCursorHover,
  });

  return (
    <>
      <div
        className={stylesChannelOverview}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4 flex-grow">
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
              {isSystemUser
                ? 'All Users as members'
                : `${usersAssociatedTotal} members`}{' '}
              {usersAssociated.length > 0 && isSystemUser
                ? ''
                : usersAssociated.length > 0
                ? `(${usersAssociated.join(', ')})`
                : ''}
            </Typography>
            <Typography tag="div" color="gray-medium">
              {`Created by: ${createdBy} on `}{' '}
              <DateTime timestamp={createdOn} />
            </Typography>
            {editedBy && editedOn && (
              <Typography tag="div" color="gray-medium">
                {`Last edited by ${editedBy} on `}{' '}
                <DateTime timestamp={editedOn} />
                <br />
              </Typography>
            )}
            {(isSignedInUserAssociated || isSystemUser) && (
              <div className="flex space-x-1 items-center">
                <CheckIcon color="green-medium" />
                <Typography tag="div" color="green-medium" weight="semibold">
                  Joined
                </Typography>
              </div>
            )}
          </div>
        </div>
        {isCursorHover && (
          <div className="flex pr-4 pb-4 pl-4 items-center space-x-3">
            <Button
              type="button"
              color="white"
              click={() => showEditChannelDialog(channelId)}
            >
              Edit
            </Button>
            {canUserManageArchive && isArchived && (
              <Button
                type="button"
                color="white"
                click={() => unarchiveChannel(channelId)}
              >
                Unarchive
              </Button>
            )}
            {canUserManageArchive && !isArchived && (
              <Button
                type="button"
                color="white"
                click={() => archiveChannel(channelId)}
              >
                Archive
              </Button>
            )}
            {isSignedInUserAssociated && !isSystemUser && (
              <Button
                type="button"
                color="white"
                click={() => dissociateUserChannel(channelId)}
              >
                Leave
              </Button>
            )}
            {!isSignedInUserAssociated && !isSystemUser && (
              <Button
                type="button"
                color="green"
                click={() => associateUserChannel(channelId)}
              >
                Join channel
              </Button>
            )}
          </div>
        )}
      </div>
      {pondErrorMessage && (
        <div className="pr-4 bottom-0 w-full">
          <Alert variant="danger">{pondErrorMessage}</Alert>
        </div>
      )}
    </>
  );
};
