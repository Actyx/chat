import React, { FC, useContext } from 'react';
import { MAIN_CHANNEL } from '../../../business-logic/channel-fish/channel-fish';
import { ChannelId } from '../../../business-logic/message/types';
import {
  openChannelsCatalogSection,
  openChannelSection,
} from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';

export type Channels = ReadonlyArray<{ channelId: ChannelId; name: string }>;

type Props = Readonly<{
  channels: Channels;
  openAddChannelDialog: () => void;
}>;

export const Sidebar: FC<Props> = ({ channels, openAddChannelDialog }) => {
  const dispatch = useContext(DispatchContextUI);

  const handleChannelsCatalog = () => dispatch(openChannelsCatalogSection());

  const handleMain = () => dispatch(openChannelSection(MAIN_CHANNEL));

  const handleOpenAddChannelDialog = () => openAddChannelDialog();

  return (
    <div>
      Main navigation:
      <ul>
        <li>
          <button onClick={handleChannelsCatalog}>Channels catalog</button>
        </li>
      </ul>
      Channels:
      <ul>
        {channels.map((x) => (
          <li key={x.channelId}>
            <button onClick={handleMain}>{x.name}</button>
          </li>
        ))}
      </ul>
      <button onClick={handleOpenAddChannelDialog}>Add a Channel</button>
    </div>
  );
};
