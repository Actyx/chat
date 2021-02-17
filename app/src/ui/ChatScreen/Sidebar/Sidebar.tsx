import React, { FC, useContext } from 'react';
import { MAIN_CHANNEL } from '../../../business-logic/channel-fish/channel-fish';
import { ChannelId } from '../../../business-logic/message/types';
import {
  openChannelsCatalogSection,
  openChannelSection,
} from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';
import { ChannelsList } from './ChannelsList';

export type ChannelsListUI = ReadonlyArray<{
  channelId: ChannelId;
  name: string;
}>;

type Props = Readonly<{
  channels: ChannelsListUI;
  openAddChannelDialog: () => void;
}>;

export const Sidebar: FC<Props> = ({ channels, openAddChannelDialog }) => {
  const dispatch = useContext(DispatchContextUI);

  const handleChannelsCatalog = () => dispatch(openChannelsCatalogSection());

  const handleMain = (channelId: ChannelId) => {
    //FIXME use the right channel fish here
    window.alert(`now swtich to this ${channelId}`);
    dispatch(openChannelSection(MAIN_CHANNEL));
  };

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
      <ChannelsList channels={channels} selectChannel={handleMain} />
      <button onClick={handleOpenAddChannelDialog}>Add a Channel</button>
    </div>
  );
};
