import React, { useContext } from 'react';
import { ChannelId } from '../../../business-logic/message/types';
import {
  showChannelsCatalogSection,
  showChannelSection,
} from '../../ui-state-manager/actions';
import { DispatchContextUI } from '../../ui-state-manager/UIStateManager';
import { ChannelsList } from './ChannelsList';
import { SpeakerphoneIcon } from '../../common/Icons/SpeakerphoneIcon';
import { Typography } from '../../common/Typography/Typography';
import { CollapsibleList } from './CollapsibleList';

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
    <div className="w-60 bg-gray-700 p-3">
      <ul className="text-white">
        <li>
          <button className="flex space-x-2" onClick={handleChannelsCatalog}>
            <div>{SpeakerphoneIcon}</div>
            <Typography tag="div" color="gray-light">
              Channels
            </Typography>
          </button>
        </li>
      </ul>
      <CollapsibleList title="Channels">
        <ChannelsList channels={channels} selectChannel={handleMain} />
      </CollapsibleList>
      <button onClick={handleShowAddChannelDialog}>Add a Channel</button>
    </div>
  );
};
