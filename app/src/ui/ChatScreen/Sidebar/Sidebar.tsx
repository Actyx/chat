import { FC, useContext } from 'react';
import { MAIN_CHANNEL } from '../../../business-logic/channel-fish/channel-fish';
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

export const Sidebar: FC<Props> = ({ channels, showAddChannelDialog }) => {
  const dispatch = useContext(DispatchContextUI);

  const handleChannelsCatalog = () => dispatch(showChannelsCatalogSection());

  const handleMain = (channelId: ChannelId) => {
    //FIXME use the right channel fish here
    window.alert(`now swtich to this ${channelId}`);
    dispatch(showChannelSection(MAIN_CHANNEL));
  };

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
