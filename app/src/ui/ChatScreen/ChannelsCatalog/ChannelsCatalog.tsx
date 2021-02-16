import React, { FC } from 'react';
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
}>;

export const ChannelsCatalog: FC<Props> = ({ channels }) => {
  return (
    <div>
      <h2>Channels Catalog</h2>
      <div>
        {channels.map((c) => (
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
            {c.editedBy && `Edited by ${c.editedBy} on ${c.editedOn}`}
            <br />
            {c.isSignedInUserAssociated && 'joined'}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};