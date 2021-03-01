import { useContext } from 'react';
import { ChannelId } from '../../../business-logic/message/types';
import {
  showChannelsCatalogSection,
  showChannelSection,
} from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';
import { ChannelsList } from './ChannelsList';

export type ChannelsListUI = ReadonlyArray<{
  channelId: ChannelId;
  name: string;
}>;

type Props = Readonly<{
  channels: ChannelsListUI;
  showAddChannelDialog: () => void;
}>;

export const Sidebar = ({ channels, showAddChannelDialog }: Props) => {
  const dispatch = useContext(DispatchContextUI);

  const handleChannelsCatalog = () => dispatch(showChannelsCatalogSection());

  const handleMain = (channelId: ChannelId) =>
    dispatch(showChannelSection(channelId));

  const handleShowAddChannelDialog = () => showAddChannelDialog();

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
      <button onClick={handleShowAddChannelDialog}>Add a Channel</button>
    </div>
  );
};
